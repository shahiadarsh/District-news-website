import axios from 'axios';

// Get the baseURL from environment variables
const baseURL = process.env.REACT_APP_API_BASE_URL;
const api = axios.create({
  baseURL: baseURL,  // Use the environment variable for the base URL
  withCredentials: true, // This is important to send cookies with requests
});

export default api;
