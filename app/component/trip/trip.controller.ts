import { Request, Response } from 'express';
import TripService from './trip.service';
import { ClientError } from '../../exception/client.error';
import ResponseHandler from '../../lib/response-handler';
import RiderService from '../user/rider.service';
import TripModel, { driver_STATUS_ENUM } from './repository/trip.model';
import RiderModel from '../user/repository/rider.model';
import { TripInterface } from './interface/trip.interface';
import DriverModel, {
  DRIVER_STATUS_ENUM,
} from '../driver/repository/driver.model';
import SharedHelper from '../../lib/shared.helper';
import WalletModel from '../wallet/wallet.model';
import TripHelper from './trip.helper';

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
    if (existingWeeklyTrips.length > 0)
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
    ResponseHandler.CreatedResponse(response, 'check out succesful');
    return TripService.dailyCheckOut(request.user.id);
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
  public getDriverAndFare = async (request: Request, response: Response) => {
    const { pickUpLocation, dropOffLocation } = request.body;
    // 1. Calculate fare
    const fareDetails = TripHelper.calculateFare(
      pickUpLocation.latitude,
      pickUpLocation.longitude,
      dropOffLocation.latitude,
      dropOffLocation.longitude,
    );
    // 2. Fetch nearby drivers based on pickup location (e.g., within 5km radius)
    const nearbyDrivers = await DriverModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [pickUpLocation.longitude, pickUpLocation.latitude],
            5 / 6371,
          ], // 5 km radius
        },
      },
    });
    // 3. For each driver, calculate their individual fare
    const driversWithFare = nearbyDrivers.map((driver) => {
      console.log(driver, 'one driber');
      // If the location exists, proceed with distance and fare calculation
      const driverDistanceToRider = TripHelper.calculateDistance(
        pickUpLocation.latitude,
        pickUpLocation.longitude,
        driver.location.coordinates[1], // Latitude
        driver.location.coordinates[0], // Longitude
      );

      // Add additional cost based on driver's proximity to rider (e.g., ₦50/km)
      const additionalDriverFare = driverDistanceToRider * 50; // Adjust this factor as needed

      // Final fare is trip fare + driver proximity fare
      const finalFare =
        parseFloat(fareDetails.estimatedFare) + additionalDriverFare;

      return {
        driverName: driver.firstName,
        carModel: driver.vehicle.model,
        _id: driver._id,
        driverDistanceToRider: driverDistanceToRider, // Distance in km
        finalFare: finalFare.toFixed(2), // Fare for this driver
        currency: 'NGN',
      };
    });

    console.log(nearbyDrivers, 'nearbyDrivers');
    return ResponseHandler.OkResponse(response, 'FETCHED near by drivers', {
      tripDistance: fareDetails.distance, // Distance for the trip
      estimatedTripFare: fareDetails.estimatedFare, // Base fare for the trip
      drivers: driversWithFare,
    });
  };
  public selectDriver = async (request: Request, response: Response) => {
    const findDriver = await DriverModel.findOne({
      _id: SharedHelper.convertStringToObjectId(request.body.driver),
    });
    if (!findDriver) throw new ClientError('driver does not exist');
    const findTrip = await TripModel.findOne({
      _id: SharedHelper.convertStringToObjectId(request.body.trip),
    });
    if (!findTrip) throw new ClientError('trip does not exist');
    const findUser = await RiderService.findOne({ _id: findTrip.rider });
    console.log(findUser, 'seen user');
    if (!findUser.wallet) {
      const wallet = await WalletModel.create({ rider: findUser._id });
      await RiderService.update(findUser._id, { wallet: wallet._id });
    }
    const findUserAgaian = await RiderService.findOne({ _id: findTrip.rider });
    console.log(findUserAgaian, 'the findUserAgaian');
    console.log(findTrip, 'find tripe');
    const fee = TripHelper.calculateFare(
      findTrip.pickUpLocation.latitude,
      findTrip.pickUpLocation.longitude,
      findTrip.dropOffLocation.latitude,
      findTrip.dropOffLocation.longitude,
    );
    return ResponseHandler.CreatedResponse(response, 'trip booked');
  };

  public confirmTrip = async (request: Request, response: Response) => {
    // 3. Calculate the fare
    const { pickUpLocation, dropOffLocation, driver } = request.body;
    const fareDetails = TripHelper.calculateFare(
      pickUpLocation.latitude,
      pickUpLocation.longitude,
      dropOffLocation.latitude,
      dropOffLocation.longitude,
    );
    const findDriver = await DriverModel.findOne({
      _id: SharedHelper.convertStringToObjectId(request.body.driver),
    });
    console.log(findDriver, 'the driver');
    if (!findDriver) throw new ClientError('driver does not exist');
    const findUser = await RiderService.findOne({ _id: request.user.id });
    if (!findUser.wallet) {
      const wallet = await WalletModel.create({ rider: findUser._id });
      await RiderService.update(findUser._id, { wallet: wallet._id });
    }
    const findUserAgaian = await RiderService.findOne({ _id: request.user.id });
    console.log(findUserAgaian, 'the findUserAgaian');
    const totalFare = parseFloat(fareDetails.estimatedFare); // Base fare
    // Adjust based on additional distance calculations
    const finalFare = totalFare + totalFare;
    if (findUserAgaian.wallet.amount < finalFare)
      throw new ClientError('Insufficient funds in wallet.');
    console.log(findUserAgaian.wallet, 'findUserAgaian.wallet');
    const deduct = await WalletModel.findByIdAndUpdate(
      findUserAgaian.wallet._id,
      { amount: findUserAgaian.wallet.amount - finalFare },
      { new: true },
    );
    // 5. Deduct the amount from the rider's wallet
    console.log(deduct, 'thededuct');
    // 6. Create the trip
    const createtrip = await TripModel.create({
      pickUpLocation,
      dropOffLocation,
      rider: request.user.id,
      driver,
      fare: finalFare,
      status: driver_STATUS_ENUM.CONFIRMED,
    });
    await DriverModel.findByIdAndUpdate(driver, {
      status: DRIVER_STATUS_ENUM.BUSY,
    });
    ResponseHandler.CreatedResponse(response, 'trip boooked', {
      trip: {
        _id: createtrip._id,
        fare: finalFare,
        driver: {
          name: findDriver.firstName,
          carModel: findDriver.vehicle.model,
        },
      },
    });
    await RiderModel.findByIdAndUpdate(
      request.user.id,
      { $push: { trips: createtrip._id } },
      { new: true }, // Option to return the updated document
    );
    return DriverModel.findByIdAndUpdate(
      findDriver._id,
      { $push: { trips: createtrip._id } },
      { new: true }, // Option to return the updated document
    );
  };
}

export default TripController;
