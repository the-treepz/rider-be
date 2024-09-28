const TripPush = {
  async sendTripCanceled({
    firstName,
    dropOffLocation,
    pickUpLocation,
    deviceToken,
  }) {
    const message = {
      title: 'Trip Canceled',
      body: `${firstName}, your trip from ${pickUpLocation} to ${dropOffLocation} has been canceled.`,
      data: {
        type: 'trip',
        reason: 'canceled',
      },
    };

    try {
      await sendPushNotification(deviceToken, message);
      console.log('Push notification for trip canceled sent successfully.');
    } catch (error) {
      console.error(
        'Error sending push notification for trip canceled:',
        error,
      );
    }
  },

  async sendTripBooked({
    firstName,
    dropOffLocation,
    pickUpLocation,
    vehicle,
    deviceToken,
  }) {
    const message = {
      title: 'Trip Confirmed',
      body: `${firstName}, your trip from ${pickUpLocation} to ${dropOffLocation} is confirmed. Vehicle: ${vehicle}.`,
      data: {
        type: 'trip',
        reason: 'confirmed',
      },
    };

    try {
      console.log('devtken')
      // await sendPushNotification(deviceToken, message);
      console.log('Push notification for trip booked sent successfully.');
    } catch (error) {
      console.error('Error sending push notification for trip booked:', error);
    }
  },
};

export default TripPush;
