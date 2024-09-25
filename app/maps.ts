import axios from 'axios';
const apiKey = 'AIzaSyAhO7hcE9OavPyvOWNQZUAYKlgil47uKt8';

const Maps = {
  async getLocationFromCoordinates(latitude: number, longitude: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        return response.data.results[0].formatted_address; // Return the formatted address
      } else {
        return 'N/A';
      }
    } catch (error) {
      return null;
    }
  },
};
export default Maps;
