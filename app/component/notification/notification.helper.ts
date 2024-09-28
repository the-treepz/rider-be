import { RiderInterface } from '../user/interface/rider.interface';
import { TripInterface } from '../trip/interface/trip.interface';
import Maps from '../../maps';
import TripEmail from '../trip/trip.email';

const NotificationHelper = {
  async notifyUser(
    rider: RiderInterface,
    details: {
      type: string;
      reason: string;
      findTrip: TripInterface;
      driverVehicle?: string;
    },
  ) {
    const { type, reason, findTrip, driverVehicle } = details;
    const dropOffLocationString = await Maps.getLocationFromCoordinates(
      findTrip.dropOffLocation.latitude,
      findTrip.dropOffLocation.longitude,
    );
    const pickUpLocationString = await Maps.getLocationFromCoordinates(
      findTrip.pickUpLocation.latitude,
      findTrip.pickUpLocation.longitude,
    );
    // Notification settings for trip-related events
    if (type === 'trips' && rider.notificationPreferences.trips) {
      const tripPreferences = rider.notificationPreferences.trips;
      // Trip Cancelled Notification
      if (reason === 'trip canceled') {
        if (tripPreferences.email) {
          await TripEmail.sendTripCanceled({
            firstName: rider.firstName,
            dropOffLocation: dropOffLocationString,
            pickUpLocation: pickUpLocationString,
            email: rider.email,
          });
        }
        if (tripPreferences.sms && rider.phoneNumber) {
          // await TripSMS.sendTripCanceled({
          //   firstName: rider.firstName,
          //   dropOffLocation: dropOffLocationString,
          //   pickUpLocation: pickUpLocationString,
          //   phoneNumber: rider.phoneNumber,
          // });
          //intgrate sms here
        }
        if (tripPreferences.push && rider.deviceToken) {
          // await TripPush.sendTripCanceled({
          //   firstName: rider.firstName,
          //   dropOffLocation: dropOffLocationString,
          //   pickUpLocation: pickUpLocationString,
          //   deviceToken: rider.deviceToken,
          // });
        }

        await TripEmail.sendTripBookedEmail({
          firstName: rider.firstName,
          dropOffLocation: dropOffLocationString,
          pickUpLocation: pickUpLocationString,
          vehicle: driverVehicle,
        });
      }

      // Trip Confirmed Notification
      if (reason === 'trip confirmed') {
        if (tripPreferences.email) {
          await TripEmail.sendTripBookedEmail({
            firstName: rider.firstName,
            dropOffLocation: dropOffLocationString,
            pickUpLocation: pickUpLocationString,
            vehicle: driverVehicle,
          });
        }
        if (tripPreferences.sms && rider.phoneNumber) {
          // await TripSMS.sendTripBooked({
          //   firstName: rider.firstName,
          //   dropOffLocation: dropOffLocationString,
          //   pickUpLocation: pickUpLocationString,
          //   vehicle: driverVehicle,
          //   phoneNumber: rider.phoneNumber,
          // });
        }
        if (tripPreferences.push && rider.deviceToken) {
          // await TripPush.sendTripBooked({
          //   firstName: rider.firstName,
          //   dropOffLocation: dropOffLocationString,
          //   pickUpLocation: pickUpLocationString,
          //   vehicle: driverVehicle,
          //   deviceToken: rider.deviceToken,
          // });
        }
      }
    }

    // Notification settings for promotions
    // if (type === 'promotions' && rider.notificationPreferences.promotions) {
    //   // const promotionPreferences = rider.notificationPreferences.promotions;
    //
    //   if (reason === 'new promotion') {
    //     // if (promotionPreferences.email) {
    //     //   await PromotionEmail.sendNewPromotion({
    //     //     firstName: rider.firstName,
    //     //     email: rider.email,
    //     //   });
    //     // }
    //     // if (promotionPreferences.sms && rider.phoneNumber) {
    //     //   await PromotionSMS.sendNewPromotion({
    //     //     firstName: rider.firstName,
    //     //     phoneNumber: rider.phoneNumber,
    //     //   });
    //     // }
    //     // if (promotionPreferences.push && rider.deviceToken) {
    //     //   await PromotionPush.sendNewPromotion({
    //     //     firstName: rider.firstName,
    //     //     deviceToken: rider.deviceToken,
    //     //   });
    //     // }
    //   }
    // }
  },
};

export default NotificationHelper;
