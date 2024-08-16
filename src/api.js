import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual backend base URL
  withCredentials: true, // If you need to send cookies with requests
});

export default api;
