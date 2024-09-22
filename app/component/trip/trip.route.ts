import TripController from './trip.controller';
import { Application } from 'express';
import { asyncHandler } from '../../middleware/async-handler';
import requireAuthorization from '../../middleware/require-authorization';
import * as url from './trip.url';
import TripValidation from './trip.validation';
import {
  CANCEL,
  CONFIRM_TRIP,
  DRIVERS_AND_FARE,
  FARE_ESTIMATE,
  PICK_DRIVER,
} from './trip.url';

/**
 * todos
 * Confirm Trip: Assign a driver to the trip.
 * Get Status: Check the current status of the trip.
 * Complete Trip: Mark the trip as completed and optionally rate the driver.
 * Cancel Trip: Allow users to cancel the trip if needed.
 *  Calculate Trip Fare
 * POST /api/trip/fare
 * Description: Calculate the fare for the trip based on the distance between pickup and drop-off locations.
 */
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
    app
      .route(`${url.GET_TRIPS}`)
      .get(
        asyncHandler(requireAuthorization),
        asyncHandler(this.tripController.getTrips),
      );
    app
      .route(`${url.BOOK_TRIP}`)
      .post(
        asyncHandler(requireAuthorization),
        asyncHandler(TripValidation.bookTrip),
        asyncHandler(this.tripController.bookTrip),
      );
    app
      .route(`${url.PICK_DRIVER}`)
      .post(
        asyncHandler(requireAuthorization),
        asyncHandler(TripValidation.selectDriver),
        asyncHandler(this.tripController.selectDriver),
      );
    app
      .route(`${url.CONFIRM_TRIP}`)
      .post(
        asyncHandler(requireAuthorization),
        asyncHandler(TripValidation.confirmTrip),
        asyncHandler(this.tripController.confirmTrip),
      );
    app
      .route(`${url.FARE_ESTIMATE}`)
      .post(
        asyncHandler(requireAuthorization),
        asyncHandler(TripValidation.confirmTrip),
        asyncHandler(this.tripController.bookTrip),
      );
    app
      .route(`${url.DRIVERS_AND_FARE}`)
      .post(
        asyncHandler(requireAuthorization),
        asyncHandler(TripValidation.bookTrip),
        asyncHandler(this.tripController.getDriverAndFare),
      );
    app
      .route(`${url.CANCEL}/:tripId`)
      .put(
        asyncHandler(requireAuthorization),
        asyncHandler(this.tripController.cancelTtrip),
      );
  };
}

export default TripRoute;
