import TripController from './trip.controller';
import { Application } from 'express';

class TripRoute {
  public tripController: TripController = new TripController();

  public routes = (app: Application): void => {
    // app
    //     .route(`${url.GET_TRIPS}`)
    //     .get(
    //         asyncHandler(requireAuthorization),
    //         asyncHandler(this.tripController.getTrips),
    //     );
    // app
    //     .route(`${url.DAILY_CHECK_IN}`)
    //     .get(
    //         asyncHandler(requireAuthorization),
    //         asyncHandler(this.tripController.dailyCheckIn),
    //     );
    // app
    //     .route(`${url.GET_TRIP}/:tripId`)
    //     .get(
    //         asyncHandler(requireAuthorization),
    //         asyncHandler(this.tripController.getTrip),
    //     );
    // app
    //     .route(`${url.GET_CHECK_IN}`)
    //     .get(
    //         asyncHandler(requireAuthorization),
    //         asyncHandler(this.tripController.getCheckIns),
    //     );
    // app
    //     .route(`${url.GET_CHECK_OUT}`)
    //     .get(
    //         asyncHandler(requireAuthorization),
    //         asyncHandler(this.tripController.getCheckOuts),
    //     );
  };
}

export default TripRoute;
