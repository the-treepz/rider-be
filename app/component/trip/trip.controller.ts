import {Request, Response} from "express";
import TripService from "./trip.service";
import {ClientError} from "../../exception/client.error";
import ResponseHandler from "../../lib/response-handler";
import UserService from "../user/user.service";
import TripModel from "./repository/trip.model";
import UserModel from "../user/repository/user.model";
import {TripInterface} from "./interface/trip.interface";

class TripController {
  public dailyCheckIn = async (request: Request, response: Response) => {
    const existingTrip = await TripService.findOne({
      rider: request.user.id,
      checkOutTime: null,
      checkInType: 'Daily',
    });
    if (existingTrip)
      throw new ClientError('Employee already checked in for the day.');
    ResponseHandler.CreatedResponse(response, 'check in created');
    const trip = await TripService.create({
      rider: request.user.id,
      checkInTime: new Date(),
      checkInType: 'Daily',
    });
    return UserService.updateAndPush(
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
    // Check for existing weekly check-ins for the selected dates
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
    await UserModel.findOneAndUpdate(
        { _id: request.user.id },
        { $push: { trips: { $each: tripIds } } },
        { new: true },
    );
    return ResponseHandler.CreatedResponse(
        response,
        'Weekly check-in successful',
    );
  };
  public dailyCheckOut = async (request: Request, response: Response) => {
    ResponseHandler.CreatedResponse(response, 'check out succesful');
    return TripService.dailyCheckOut(request.user.id);
  };
  public weeklyCheckOut = async (request: Request, response: Response) => {
    const trips = await TripService.findweeklyCheckn(request.user.id);
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
}

export default TripController;
