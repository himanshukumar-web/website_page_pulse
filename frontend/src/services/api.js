import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL;
const baseURL = rawApiUrl ? rawApiUrl.replace(/\/+$/, '') : '';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export default api;
