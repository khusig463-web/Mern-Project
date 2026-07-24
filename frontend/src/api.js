import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL || 'https://mern-project-883z.onrender.com';
const apiBaseUrl = rawBaseUrl.replace(/\/$/, '');

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
});

// Yeh middleware har request ke sath JWT token automatic bhej dega (agar login hai toh)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
