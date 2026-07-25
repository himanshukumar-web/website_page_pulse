const app = require('./app');
const { PORT, NODE_ENV } = require('./config/env');

app.listen(PORT, () => {
  console.log(`\n  🚀 Page Pulse API running`);
  console.log(`     → Port:        ${PORT}`);
  console.log(`     → Environment: ${NODE_ENV}`);
  console.log(`     → Health Check: /api/health\n`);
});
