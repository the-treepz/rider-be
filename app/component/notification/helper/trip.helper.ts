const TripHelper = {
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // Distance in km
    return R * c;
  },

  // Function to calculate the estimated fare
  calculateFare(
    pickupLat: number,
    pickupLon: number,
    dropoffLat: number,
    dropoffLon: number,
  ) {
    const baseFare = 500; // ₦500 base fare
    const farePerKm = 100; // ₦100 per kilometer

    // Calculate distance in km
    const distance = this.calculateDistance(
      pickupLat,
      pickupLon,
      dropoffLat,
      dropoffLon,
    );

    // Total fare
    const totalFare = baseFare + farePerKm * distance;
    return {
      distance: distance.toFixed(2), // Distance in km (rounded to 2 decimal places)
      estimatedFare: totalFare.toFixed(2), // Fare rounded to 2 decimal places
    };
  },
};
export default TripHelper;
