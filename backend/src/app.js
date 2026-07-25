const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { NODE_ENV, CORS_ORIGIN } = require('./config/env');
const { HTTP_STATUS } = require('./utils/constants');
const { success, error } = require('./utils/responseFormatter');
const analyzeRoutes = require('./routes/analyzeRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (req, res) => {
  return success(res, HTTP_STATUS.OK, {
    status: 'healthy',
    uptime: `${Math.floor(process.uptime())}s`,
    environment: NODE_ENV,
  });
});

app.use('/api', analyzeRoutes);

app.use((req, res) => {
  return error(
    res,
    HTTP_STATUS.NOT_FOUND,
    `Route ${req.method} ${req.originalUrl} not found`
  );
});

app.use(errorHandler);

module.exports = app;
