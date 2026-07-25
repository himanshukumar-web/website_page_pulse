/**
 * Standardized API response helpers.
 * Every endpoint uses these instead of writing res.json() directly.
 */

const success = (res, statusCode, data) => {
  return res.status(statusCode).json({
    success: true,
    timestamp: new Date().toISOString(),
    data,
  });
};

const error = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
    status: statusCode,
  });
};

module.exports = { success, error };
