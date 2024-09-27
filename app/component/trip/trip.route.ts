import TripController from "./trip.controller";
import {Application} from "express";
import * as url from "./trip.url";
import {asyncHandler} from "../../middleware/async-handler";
import requireAuthorization from "../../middleware/require-authorization";
import TripValidation from "./trip.validation";

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
        .route(`${url.UPCOMING_TRIPS}`)
        .get(
            asyncHandler(requireAuthorization),
            asyncHandler(this.tripController.getUpcomingTrips),
        );
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
        .route(`${url.GET_RECENT_PICKUPS_ADDRESSES}`)
        .get(
            asyncHandler(requireAuthorization),
            asyncHandler(this.tripController.getRecentPickUpAddresses),
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
    app
        .route(`${url.GET_TRIP}/:tripId`)
        .get(
            asyncHandler(requireAuthorization),
            asyncHandler(this.tripController.getTrip),
        );
  };
}

export default TripRoute;
