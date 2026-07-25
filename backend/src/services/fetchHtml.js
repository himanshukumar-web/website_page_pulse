const axiosInstance = require('../config/axiosInstance');
const {
  HTTP_STATUS,
  AXIOS_ERROR_MAP,
  ERROR_MESSAGES,
} = require('../utils/constants');

const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    const err = new Error(ERROR_MESSAGES.MISSING_URL);
    err.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }

  try {
    const parsed = new URL(url.trim());
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      const err = new Error(ERROR_MESSAGES.INVALID_URL);
      err.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw err;
    }
  } catch (e) {
    if (e.statusCode) throw e;
    const err = new Error(ERROR_MESSAGES.INVALID_URL);
    err.statusCode = HTTP_STATUS.BAD_REQUEST;
    throw err;
  }
};

const isHtmlResponse = (contentType) => {
  if (!contentType) return false;
  return contentType.toLowerCase().includes('text/html');
};

const categorizeError = (axiosError) => {
  const code = axiosError.code;
  const err = new Error();

  switch (code) {
    case 'ECONNABORTED':
    case 'ETIMEDOUT':
      err.message = ERROR_MESSAGES.TIMEOUT;
      break;
    case 'ENOTFOUND':
      err.message = ERROR_MESSAGES.DNS_FAILURE;
      break;
    case 'ECONNREFUSED':
      err.message = ERROR_MESSAGES.CONNECTION_REFUSED;
      break;
    case 'ECONNRESET':
      err.message = ERROR_MESSAGES.CONNECTION_RESET;
      break;
    case 'ERR_FR_TOO_MANY_REDIRECTS':
      err.message = ERROR_MESSAGES.TOO_MANY_REDIRECTS;
      break;
    default:
      err.message = ERROR_MESSAGES.WEBSITE_DOWN;
  }

  err.statusCode = AXIOS_ERROR_MAP[code] || HTTP_STATUS.BAD_GATEWAY;
  return err;
};

const fetchHtml = async (url) => {
  validateUrl(url);
  const trimmedUrl = url.trim();
  const startTime = Date.now();

  try {
    const response = await axiosInstance.get(trimmedUrl);
    const responseTime = Date.now() - startTime;
    const contentType = response.headers['content-type'] || '';

    if (!isHtmlResponse(contentType)) {
      const err = new Error(ERROR_MESSAGES.NON_HTML_RESPONSE);
      err.statusCode = HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE;
      throw err;
    }

    const finalUrl = response.request?.res?.responseUrl || response.config.url;

    return {
      statusCode: response.status,
      responseTime,
      html: response.data,
      finalUrl,
      contentType,
    };
  } catch (err) {
    if (err.statusCode) throw err;
    throw categorizeError(err);
  }
};

module.exports = fetchHtml;
