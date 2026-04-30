require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const app = require('./app');

const PORT = parseInt(process.env.PORT, 10) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Job Board API running at http://localhost:${PORT}`);
  console.log(`📋 Endpoints:`);
  console.log(`   GET  /api/jobs      — List jobs (search, filter, pagination)`);
  console.log(`   GET  /api/jobs/:id  — Get job details`);
  console.log(`   POST /api/jobs      — Create a new job`);
  console.log(`   GET  /api/health    — Health check`);
});
