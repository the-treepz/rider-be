import {Request, Response} from 'express';
import TripService from './trip.service';
import {ClientError} from '../../exception/client.error';
import ResponseHandler from '../../lib/response-handler';
import RiderService from '../user/rider.service';
import TripModel, {TRIP_STATUS_ENUM} from './repository/trip.model';
import RiderModel from '../user/repository/rider.model';
import {CreateTripInterface, TripInterface} from './interface/trip.interface';
import DriverModel, {DRIVER_STATUS_ENUM,} from '../driver/repository/driver.model';
import SharedHelper from '../../lib/shared.helper';
import WalletModel from '../wallet/repository/wallet.model';
import TripHelper from './helper/trip.helper';
import DriverService from '../driver/driver.service';
import Maps from '../../maps';
import NotificationHelper from '../notification/notification.helper';
import {NotFoundError} from '../../exception/not-found.error';
import TransactionModel from '../transaction/repository/transaction.model';

class TripController {
  public dailyCheckIn = async (request: Request, response: Response) => {
    const existingTrip = await TripService.findOne({
      rider: request.user.id,
      checkOutTime: null,
      checkInType: 'Daily',
    });
    if (existingTrip)
      throw new ClientError('Employee already checked in for the day.');
    ResponseHandler.CreatedResponse(response, 'daily check in created');
    const trip = await TripService.create({
      rider: request.user.id,
      checkInTime: new Date(),
      checkInType: 'Daily',
    });
    return RiderService.updateAndPush(
      { _id: request.user.id },
      {
        trips: trip._id,
      },
    );
  };
  public weeklyCheckIn = async (request: Request, response: Response) => {
    if (!request.body.selectedDates)
      throw new ClientError('Selected dates are required');
    const { selectedDates } = request.body;
    const checkInDateObjects = selectedDates.map(
      (dateString: string | number | Date) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          throw new ClientError(`Invalid date format provided: ${dateString}`);
        }
        return new Date(date.setUTCHours(0, 0, 0, 0));
      },
    );
    const existingWeeklyTrips = await TripService.find({
      rider: request.user.id,
      checkOutTime: null,
      checkInType: 'Weekly',
      checkInTime: { $in: checkInDateObjects },
    });
    if (existingWeeklyTrips && existingWeeklyTrips.length > 0)
      throw new ClientError(
        'Employee already has weekly check-ins for some selected dates.',
      );
    const existingTrips = await TripService.findOne({
      rider: request.user.id,
      checkOutTime: null,
      checkInType: 'Daily',
      checkInTime: { $in: checkInDateObjects },
    });
    if (existingTrips && existingTrips.length > 0)
      throw new ClientError(
        'Employee already has daily check-ins for some selected dates.',
      );
    const checkInEntries = checkInDateObjects.map((checkInDate: any) => ({
      rider: request.user.id,
      checkInTime: checkInDate,
      checkInType: 'Weekly',
      checkOutTime: null,
    }));
    const createdCheckIns = await TripModel.insertMany(checkInEntries);
    const tripIds = createdCheckIns.map((trip) => trip._id);
    await RiderModel.findOneAndUpdate(
      { _id: request.user.id },
      { $push: { trips: { $each: tripIds } } },
      { new: true },
    );
    return ResponseHandler.CreatedResponse(
      response,
      'Weekly check-in successful',
    );
  };
  public getTrips = async (request: Request, response: Response) => {
    const trips = await TripService.getTrips(request.user.id);
    return ResponseHandler.OkResponse(response, 'Trips fetched successfully', {
      trips,
    });
  };
  public dailyCheckOut = async (request: Request, response: Response) => {
    const getTrip = await TripService.findOne({
      rider: request.user.id,
      checkOutTime: null,
      checkInType: 'Daily',
    });
    if (getTrip) {
      ResponseHandler.OkResponse(response, 'check out succesful');
      return  TripService.dailyCheckOut(request.user.id);
    }
    throw new NotFoundError('no trip to be checked out from');
  };
  public weeklyCheckOut = async (request: Request, response: Response) => {
    const trips = await TripService.findWeeklyCheckn(request.user.id);
    if (trips.length === 0)
      throw new ClientError(
        'No ongoing weekly check-ins found for this employee.',
      );
    const updatedTrips = await Promise.all(
      trips.map(async (trip: { _id: TripInterface['_id'] }) => {
        return TripService.weeklyCheckOut(request.user.id);
      }),
    );
    return ResponseHandler.CreatedResponse(
      response,
      'weekly check out successful',
    );
  };
  public bookTrip = async (request: Request, response: Response) => {
    const findUser = await RiderService.findOne({ _id: request.user.id });
    const isEmployee = Boolean(findUser.business); // Check if a business is associated
    if (isEmployee) {
      if (!findUser.phoneNumber && !findUser.alternativeEmail) {
        throw new ClientError(
          'Please provide your phone number or personal email address for personal bookings.',
        );
      }
    }
    const { pickUpLocation, dropOffLocation } = request.body;
    const trip = await TripModel.create({
      pickUpLocation,
      dropOffLocation,
      rider: request.user.id,
    });
    return ResponseHandler.CreatedResponse(response, 'trip booked', trip);
  };
  public getRecentPickUpAddresses = async (
    request: Request,
    response: Response,
  ) => {
    // Fetch recent trips for the user, selecting only pick-up locations
    const recentTrips = await TripModel.find({
      rider: request.user.id, // Find trips by the logged-in user
    })
      .select('pickUpLocation') // Only pick-up coordinates
      .sort({ createdAt: -1 }) // Sort by most recent trips
      .limit(5); // Limit to the 5 most recent trips

    // Convert pick-up coordinates to addresses and filter out null results
    const pickUpAddresses = await Promise.all(
      recentTrips.map(async (trip) => {
        if (
          !trip.pickUpLocation ||
          !trip.pickUpLocation.latitude ||
          !trip.pickUpLocation.longitude
        ) {
          return null; // Skip trips with invalid pick-up locations
        }

        const pickUpAddress = await Maps.getLocationFromCoordinates(
          trip.pickUpLocation.latitude,
          trip.pickUpLocation.longitude,
        );

        if (!pickUpAddress) return null; // Skip trips where address lookup failed

        return {
          _id: trip._id, // Keep the original _id
          pickUpLocation: trip.pickUpLocation, // Keep the original coordinates
          pickUpAddress, // Add the converted address
        };
      }),
    );

    // Filter out null results (invalid trips with missing locations or addresses)
    const validPickUpAddresses = pickUpAddresses.filter(
      (address) => address !== null,
    );

    // Respond with the valid pick-up addresses
    return ResponseHandler.OkResponse(
      response,
      'Recent pick-up addresses fetched successfully.',
      validPickUpAddresses,
    );
  };

  public getDriverAndFare = async (request: Request, response: Response) => {
    const { pickUpLocation, dropOffLocation } = request.body;
    // 1. Calculate fare
    const fareDetails = TripHelper.calculateFare(
      pickUpLocation.latitude,
      pickUpLocation.longitude,
      dropOffLocation.latitude,
      dropOffLocation.longitude,
    );
    // 2. Fetch all available drivers
    const availableDrivers = await DriverModel.find({
      status: DRIVER_STATUS_ENUM.AVALIABLE,
    }); // Adjust query as needed

    // 3. Prepare the response with calculated fare
    const driversWithFare = availableDrivers.map((driver) => ({
      driverName: driver.firstName,
      carModel: driver.vehicle.model,
      _id: driver._id,
      finalFare: fareDetails.estimatedFare, // Same fare for all drivers
      currency: 'NGN',
    }));
    return ResponseHandler.OkResponse(response, 'FETCHED available drivers', {
      tripDistance: fareDetails.distance, // Distance for the trip
      estimatedTripFare: fareDetails.estimatedFare, // Base fare for the trip
      drivers: driversWithFare,
    });
  };
  public cancelTtrip = async (request: Request, response: Response) => {
    if (!request.params.tripId)
      throw new ClientError('trip id is required to cancel trips');
    const findTripe = await TripService.find(
      { _id: SharedHelper.convertStringToObjectId(request.params.tripId) },
      true,
    );
    // 2. Check if the user is the rider of the trip
    if (findTripe.rider._id.toString() !== request.user.id)
      throw new ClientError('You are not authorized to cancel this trip.');
    if (findTripe.status === TRIP_STATUS_ENUM.CANCELED)
      throw new ClientError('trip already cancelled');
    ResponseHandler.OkResponse(response, 'trip canceled');
    const driver = await DriverService.findOne({ _id: findTripe.driver });
    await DriverService.update(driver._id, {
      status: DRIVER_STATUS_ENUM.AVALIABLE,
    });
    const rider = await RiderService.updateToPull(request.user.id, {
      trips: findTripe._id,
    });
    await TripModel.findByIdAndUpdate(findTripe._id, {
      status: TRIP_STATUS_ENUM.CANCELED,
    });
    return NotificationHelper.notifyUser(rider, {
      type: 'trips',
      reason: 'trip canceled',
      findTrip: findTripe,
    });
  };
  public getTrip = async (request: Request, response: Response) => {
    if (!request.params.tripId) throw new ClientError('trip id is required');
    const findTripe = await TripService.find(
      { _id: SharedHelper.convertStringToObjectId(request.params.tripId) },
      true,
    );
    const pickUpLocation = await Maps.getLocationFromCoordinates(
      findTripe.pickUpLocation.latitude,
      findTripe.pickUpLocation.longitude,
    );
    const dropOff = await Maps.getLocationFromCoordinates(
      findTripe.dropOffLocation.latitude,
      findTripe.dropOffLocation.longitude,
    );
    return ResponseHandler.OkResponse(response, 'fetched trip', {
      trip: {
        dropOffLocation: dropOff,
        pickUpLocation: pickUpLocation,
        status: findTripe.status,
        rider: {
          firstName: findTripe.firstName,
          lastName: findTripe.lastName,
        },
        driver: {
          vehicle: {
            make: findTripe.driver.vehicle.make,
            model: findTripe.driver.vehicle.model,
            licensePlate: findTripe.driver.vehicle.licensePlate,
          },
          firstName: findTripe.driver.firstName,
          lastName: findTripe.driver.lastName,
        },
      },
    });
  };
  public getUpcomingTrips = async (request: Request, response: Response) => {
    const upcomingTrips = await TripModel.find({
      rider: request.user.id,
      status: TRIP_STATUS_ENUM.SCHEDULED,
    }).populate('driver'); // Populate driver details
    return ResponseHandler.OkResponse(
      response,
      'Upcoming trips fetched successfully.',
      { upcomingTrips },
    );
  };
  public confirmTrip = async (request: Request, response: Response) => {
    const {
      pickUpLocation,
      dropOffLocation,
      driver,
      tripType,
      bookingFor,
      details,
      estimatedPickUpTime,
      estimatedDropOffTime,
    } = request.body;
    if (tripType === 'round' && !estimatedDropOffTime)
      throw new ClientError('drop off time is required');
    const fareDetails = TripHelper.calculateFare(
      pickUpLocation.latitude,
      pickUpLocation.longitude,
      dropOffLocation.latitude,
      dropOffLocation.longitude,
    );
    const findDriver = await DriverModel.findOne({
      _id: SharedHelper.convertStringToObjectId(request.body.driver),
    });
    if (!findDriver) throw new ClientError('driver does not exist');
    const findUser = await RiderService.findOne({ _id: request.user.id });
    if (!findUser.wallet) {
      const wallet = await WalletModel.create({ rider: findUser._id });
      await RiderService.update(findUser._id, { wallet: wallet._id });
    }
    const findUserAgaian = await RiderService.findOne({ _id: request.user.id });
    const totalFare = parseFloat(fareDetails.estimatedFare); // Base fare
    const finalFare = totalFare + totalFare;
    if (findUserAgaian.wallet.amount < finalFare)
      throw new ClientError('Insufficient funds in wallet.');
    const tripData: {
      pickUpLocation: any;
      dropOffLocation: any;
      rider: any;
      driver: any;
      fare: number;
      status: string;
      bookingFor: string;
      estimatedPickUpTime?: CreateTripInterface['estimatedPickUpTime']; // Optional
      estimatedDropOffTime?: CreateTripInterface['estimatedDropOffTime']; // Optional
      details?: CreateTripInterface['details']; // Optional
      tripType: string;
    } = {
      pickUpLocation,
      dropOffLocation,
      rider: request.user.id,
      driver,
      fare: finalFare,
      status:
        tripType === 'round'
          ? TRIP_STATUS_ENUM.SCHEDULED
          : TRIP_STATUS_ENUM.CONFIRMED,
      bookingFor,
      tripType,
    };
    // Set common properties
    tripData.estimatedPickUpTime = estimatedPickUpTime; // Set for both types
    if (tripType === 'round') {
      tripData.estimatedDropOffTime = estimatedDropOffTime; // Set for round trips
    }
    if (bookingFor === 'others') {
      tripData.details = details; // Include details only for "others" booking
    }
    const createTrip = await TripService.create(tripData);
    await DriverModel.findByIdAndUpdate(driver, {
      status: DRIVER_STATUS_ENUM.BUSY,
    });
    ResponseHandler.CreatedResponse(response, 'trip booked', {
      trip: {
        _id: createTrip._id,
        scheduledTime: createTrip.scheduledTime,
        fare: finalFare,
        driver: {
          name: findDriver.firstName,
          carModel: findDriver.vehicle.model,
        },
      },
    });
    await WalletModel.findByIdAndUpdate(
      findUserAgaian.wallet._id,
      { amount: findUserAgaian.wallet.amount - finalFare },
      { new: true },
    );
    console.log(findUserAgaian, 'findUserAgaianfindUserAgaian');
    await TransactionModel.create({
      wallet: findUserAgaian.wallet._id,
      type: 'Debit',
      amount: finalFare,
      description: 'Payment for trip',
      trip: createTrip._id,
    });
    await RiderModel.findByIdAndUpdate(
      request.user.id,
      { $push: { trips: createTrip._id } },
      { new: true }, // Option to return the updated document
    );
    await DriverModel.findByIdAndUpdate(
      findDriver._id,
      { $push: { trips: createTrip._id } },
      { new: true }, // Option to return the updated document
    );
    return NotificationHelper.notifyUser(findUserAgaian, {
      type: 'trips',
      reason: 'trip confirmed',
      findTrip: createTrip,
      driverVehicle: findDriver.vehicle.model,
    });
  };
}

export default TripController;
