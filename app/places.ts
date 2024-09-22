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
const apiKey = 'AIzaSyC_KxPCilUI0lczmTaMdo5yEXn9sXGUVWc';
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
