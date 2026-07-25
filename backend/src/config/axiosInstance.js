const axios = require('axios');
const { REQUEST_TIMEOUT } = require('./env');

/**
 * Pre-configured Axios instance for outbound HTTP requests.
 * Uses a realistic browser User-Agent to avoid being blocked
 * by websites that reject non-browser traffic.
 */
const axiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Accept':
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Referer': 'https://www.google.com/',
    'Upgrade-Insecure-Requests': '1',
  },
  maxRedirects: 5,
  validateStatus: (status) => status < 500,
});

// --------------- Response Interceptor ---------------

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

module.exports = axiosInstance;
