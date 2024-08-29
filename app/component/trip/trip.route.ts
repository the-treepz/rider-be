import TripController from './trip.controller';
import { Application } from 'express';
import { asyncHandler } from '../../middleware/async-handler';
import requireAuthorization from '../../middleware/require-authorization';
import * as url from './trip.url';

class TripRoute {
  public tripController: TripController = new TripController();

  public routes = (app: Application): void => {
    app
      .route(`${url.DAILY_CHECK_IN}`)
      .post(
        asyncHandler(requireAuthorization),
        asyncHandler(this.tripController.dailyCheckIn),
      );
    app
      .route(`${url.DAILY_CHECK_OUT}`)
      .post(
        asyncHandler(requireAuthorization),
        asyncHandler(this.tripController.dailyCheckOut),
      );
    app
      .route(`${url.WEEKLY_CHECK_IN}`)
      .post(
        asyncHandler(requireAuthorization),
        asyncHandler(this.tripController.weeklyCheckIn),
      );
    app
      .route(`${url.WEEKDLY_CHECK_OUT}`)
      .post(
        asyncHandler(requireAuthorization),
        asyncHandler(this.tripController.weeklyCheckOut),
      );
  };
}

export default TripRoute;
