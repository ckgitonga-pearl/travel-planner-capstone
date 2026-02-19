import axios from "axios";

// Get credentials from .env
const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;

// Amadeus test environment authentication URL
const AUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";

// Function to get access token
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      AUTH_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: API_KEY,
        client_secret: API_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Authentication Error:", error.response?.data || error.message);
    throw error;
  }
};
