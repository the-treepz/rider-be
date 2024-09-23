import axios from 'axios';

// Define the Google Places API endpoint
const GOOGLE_PLACES_API_URL =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

// Define a type for the place result
interface Place {
  name: string;
  place_id: string;
  vicinity: string;
  [key: string]: any; // Other fields you might be interested in
}

// Function to get places from Google Places API
const getNearbyPlaces = async (
  apiKey: string,
  location: { lat: number; lng: number },
  radius: number,
  // type: string
): Promise<Place[]> => {
  try {
    const response = await axios.get(GOOGLE_PLACES_API_URL, {
      params: {
        key: apiKey,
        location: `${location.lat},${location.lng}`,
        radius,
        // type,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
};

// Example usage
const apiKey = 'AIzaSyDBZbfRGoSBKrvxsvT21ow55jTqgawBCF8';
const location = { lat: 6.5244, lng: 3.3792 }; // Lagos, Nigeria
const radius = 1500; // In meters
// const type = 'restaurant'; // Type of place, e.g., restaurant, cafe, etc.

getNearbyPlaces(apiKey, location, radius)
  .then((places) => {
    console.log('Nearby places:', places);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

export const getLocationFromCoordinates = async (
  latitude: number,
  longitude: number,
) => {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
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
};
