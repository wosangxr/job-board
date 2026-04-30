require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const { pool } = require('../config/database');

const CREATE_JOBS_TABLE = `
  CREATE TABLE IF NOT EXISTS jobs (
    id            SERIAL PRIMARY KEY,
    title         VARCHAR(255) NOT NULL,
    company       VARCHAR(255) NOT NULL,
    location      VARCHAR(255) NOT NULL,
    type          VARCHAR(50)  NOT NULL
                    CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Remote')),
    salary_min    INTEGER      DEFAULT NULL,
    salary_max    INTEGER      DEFAULT NULL,
    description   TEXT         NOT NULL,
    requirements  TEXT         DEFAULT NULL,
    created_at    TIMESTAMP    DEFAULT NOW(),
    updated_at    TIMESTAMP    DEFAULT NOW()
  );
`;

async function migrate() {
  console.log('🔄 Running database migration...');
  try {
    await pool.query(CREATE_JOBS_TABLE);
    console.log('✅ Migration completed — "jobs" table is ready.');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
