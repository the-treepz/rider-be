import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TripService from './trip.service';
import ResponseHandler from '../../lib/response-handler';

class TripController {
  public getTrip = async (request: Request, response: Response) => {
    const trip = await TripService.findOne({ _id: request.params.tripId });
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'fetched trip',
      { trip },
    );
  };

  public getTrips = async (request: Request, response: Response) => {
    const { from, to, itemsPerPage = 10, pageNumber = 1 } = request.query;
    const { id: business } = request.user;
    const params = {
      business,
      from: from as string,
      to: to as string,
      itemsPerPage: itemsPerPage as number,
      pageNumber: pageNumber as number,
    };
    const { trips, totalItemsCount, totalPages, currentPage } =
      await TripService.findAll(params);
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'fetched tripsg',
      { trips, totalItemsCount, totalPages, currentPage },
    );
  };

  public getCheckIns = async (request: Request, response: Response) => {
    const result = await TripService.getTotalCheckInsOrCheckOuts(
      request.user.id,
      'in',
    );
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'fetched checkins',
      { totalCheckIns: result },
    );
  };

  public getCheckOuts = async (request: Request, response: Response) => {
    const result = await TripService.getTotalCheckInsOrCheckOuts(
      request.user.id,
      'out',
    );
    return ResponseHandler.SuccessResponse(
      response,
      StatusCodes.OK,
      'fetched checkouts',
      { totalCheckOuts: result },
    );
  };
}

export default TripController;
