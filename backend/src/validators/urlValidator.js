const { error } = require('../utils/responseFormatter');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

/**
 * Express middleware that validates the analyze request body.
 */
const validateAnalyzeRequest = (req, res, next) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string' || !url.trim()) {
    return error(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.MISSING_URL);
  }

  try {
    const parsed = new URL(url.trim());
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return error(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_URL);
    }
  } catch {
    return error(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.INVALID_URL);
  }

  req.body.url = url.trim();
  next();
};

module.exports = { validateAnalyzeRequest };
