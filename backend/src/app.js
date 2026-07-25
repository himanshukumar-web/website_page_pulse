const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const { NODE_ENV, CORS_ORIGIN } = require('./config/env');
const { HTTP_STATUS } = require('./utils/constants');
const { success, error } = require('./utils/responseFormatter');
const analyzeRoutes = require('./routes/analyzeRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// --------------- Security & Performance Middlewares ---------------

// Security headers with relaxed cross-origin resource policy for public API
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Response Gzip Compression
app.use(compression());

// Dynamic CORS configuration supporting development & production origins
const allowedOriginsList = CORS_ORIGIN && CORS_ORIGIN !== '*'
  ? CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : ['*'];

const devOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser calls (like cURL, mobile apps, server-to-server)
    if (!origin) return callback(null, true);

    if (
      allowedOriginsList.includes('*') ||
      allowedOriginsList.includes(origin) ||
      (NODE_ENV !== 'production' && devOrigins.includes(origin))
    ) {
      return callback(null, true);
    }

    const corsError = new Error(`CORS policy: Origin ${origin} is not allowed`);
    corsError.statusCode = HTTP_STATUS.BAD_REQUEST;
    return callback(corsError);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

// Request logging — 'dev' for development, 'combined' for production
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// --------------- Health Check ---------------

app.get('/api/health', (req, res) => {
  return success(res, HTTP_STATUS.OK, {
    status: 'healthy',
    uptime: `${Math.floor(process.uptime())}s`,
    environment: NODE_ENV,
  });
});

// --------------- API Routes ---------------

app.use('/api', analyzeRoutes);

// --------------- 404 Handler ---------------

app.use((req, res) => {
  return error(
    res,
    HTTP_STATUS.NOT_FOUND,
    `Route ${req.method} ${req.originalUrl} not found`
  );
});

// --------------- Global Error Handler ---------------

app.use(errorHandler);

module.exports = app;
