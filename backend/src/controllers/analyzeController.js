const fetchHtml = require('../services/fetchHtml');
const parseHtml = require('../services/parseHtml');
const generateReport = require('../services/generateReport');
const { success } = require('../utils/responseFormatter');
const { HTTP_STATUS } = require('../utils/constants');

const analyze = async (req, res, next) => {
  try {
    const { url } = req.body;
    const fetchResult = await fetchHtml(url);
    const parseResult = parseHtml(fetchResult.html);
    const report = generateReport(fetchResult, parseResult);

    return success(res, HTTP_STATUS.OK, report);
  } catch (err) {
    next(err);
  }
};

module.exports = { analyze };
