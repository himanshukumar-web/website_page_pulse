const app = require('./app');
const { PORT, NODE_ENV } = require('./config/env');

const server = app.listen(PORT, () => {
  console.log(`\n  🚀 Page Pulse API running`);
  console.log(`     → Port:        ${PORT}`);
  console.log(`     → Environment: ${NODE_ENV}`);
  console.log(`     → Health Check: /api/health\n`);
});

// Configure keep-alive timeout for cloud reverse proxies (e.g. Render, Cloudflare)
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;
