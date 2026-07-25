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

// Trust proxy header when running behind reverse proxies like Render
app.set('trust proxy', 1);

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
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
];

const isAllowedOrigin = (origin) => {
  // Allow non-browser calls (like cURL, mobile native apps, server-to-server)
  if (!origin) return true;

  // Wildcard allowed
  if (allowedOriginsList.includes('*')) return true;

  // Exact match in configured CORS_ORIGIN list
  if (allowedOriginsList.includes(origin)) return true;

  // Dev server origins
  if (devOrigins.includes(origin)) return true;

  // Production Vercel main domain & preview deployments (*.vercel.app)
  if (/^https:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/.test(origin)) return true;

  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
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
