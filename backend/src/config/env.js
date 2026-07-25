const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  REQUEST_TIMEOUT: parseInt(process.env.REQUEST_TIMEOUT, 10) || 30000,
};
