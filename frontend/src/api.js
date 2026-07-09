import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Aapke Node.js backend ka URL
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