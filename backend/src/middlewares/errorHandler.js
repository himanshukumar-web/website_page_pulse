const { error } = require('../utils/responseFormatter');
const { HTTP_STATUS } = require('../utils/constants');
const { NODE_ENV } = require('../config/env');

const errorHandler = (err, req, res, _next) => {
  if (NODE_ENV !== 'production') {
    console.error(`[Error] ${err.statusCode || 500} — ${err.message}`);
  }

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message =
    NODE_ENV === 'production' && !err.statusCode
      ? 'Internal server error'
      : err.message || 'Internal server error';

  return error(res, statusCode, message);
};

module.exports = errorHandler;
