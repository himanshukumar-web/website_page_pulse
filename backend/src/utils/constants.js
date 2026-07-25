const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  UNSUPPORTED_MEDIA_TYPE: 415,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};

/**
 * Axios error codes mapped to meaningful HTTP status codes.
 */
const AXIOS_ERROR_MAP = {
  ECONNABORTED: HTTP_STATUS.REQUEST_TIMEOUT,
  ETIMEDOUT: HTTP_STATUS.REQUEST_TIMEOUT,
  ENOTFOUND: HTTP_STATUS.BAD_GATEWAY,
  ECONNREFUSED: HTTP_STATUS.BAD_GATEWAY,
  ECONNRESET: HTTP_STATUS.BAD_GATEWAY,
  ERR_FR_TOO_MANY_REDIRECTS: HTTP_STATUS.BAD_GATEWAY,
  ERR_BAD_REQUEST: HTTP_STATUS.BAD_GATEWAY,
};

/**
 * Human-readable error messages for each failure type.
 */
const ERROR_MESSAGES = {
  INVALID_URL: 'Invalid URL format. Please provide a valid URL starting with http:// or https://',
  MISSING_URL: 'URL is required in the request body',
  TIMEOUT: 'The website took too long to respond. Please try again later',
  DNS_FAILURE: 'Could not resolve the website address. Please check the URL and try again',
  CONNECTION_REFUSED: 'The website refused the connection. It may be down or blocking requests',
  CONNECTION_RESET: 'The connection was reset by the website. Please try again',
  TOO_MANY_REDIRECTS: 'The website has too many redirects. It may be misconfigured',
  NON_HTML_RESPONSE: 'The URL did not return an HTML page. Only HTML pages can be analyzed',
  WEBSITE_DOWN: 'Failed to reach the website. It may be down or the URL may be incorrect',
  INTERNAL_ERROR: 'An unexpected error occurred. Please try again later',
};

module.exports = { HTTP_STATUS, AXIOS_ERROR_MAP, ERROR_MESSAGES };
