const { query } = require('../config/database');

/**
 * Retrieve jobs with optional search, filter, and pagination.
 * @param {Object} options
 * @param {string}  [options.search]   - Search keyword (title or company)
 * @param {string}  [options.location] - Filter by location
 * @param {string}  [options.type]     - Filter by job type
 * @param {number}  [options.page=1]   - Page number
 * @param {number}  [options.limit=10] - Items per page
 * @returns {Promise<{ jobs: Array, total: number, page: number, totalPages: number }>}
 */
async function findAll({ search, location, type, page = 1, limit = 10 } = {}) {
  const conditions = [];
  const params = [];
  let paramIndex = 1;

  if (search) {
    conditions.push(`(LOWER(title) LIKE $${paramIndex} OR LOWER(company) LIKE $${paramIndex})`);
    params.push(`%${search.toLowerCase()}%`);
    paramIndex++;
  }

  if (location) {
    conditions.push(`LOWER(location) LIKE $${paramIndex}`);
    params.push(`%${location.toLowerCase()}%`);
    paramIndex++;
  }

  if (type) {
    conditions.push(`type = $${paramIndex}`);
    params.push(type);
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Get total count for pagination
  const countResult = await query(`SELECT COUNT(*) AS total FROM jobs ${whereClause}`, params);
  const total = parseInt(countResult.rows[0].total, 10);

  // Get paginated results
  const offset = (page - 1) * limit;
  const dataParams = [...params, limit, offset];
  const dataQuery = `
    SELECT * FROM jobs
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `;

  const result = await query(dataQuery, dataParams);

  return {
    jobs: result.rows,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Find a single job by its ID.
 * @param {number} id - Job ID
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  const result = await query('SELECT * FROM jobs WHERE id = $1', [id]);
  return result.rows[0] || null;
}

/**
 * Create a new job listing.
 * @param {Object} data - Job data
 * @returns {Promise<Object>} The created job
 */
async function create(data) {
  const { title, company, location, type, salary_min, salary_max, description, requirements } = data;

  const result = await query(
    `INSERT INTO jobs (title, company, location, type, salary_min, salary_max, description, requirements)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [title, company, location, type, salary_min || null, salary_max || null, description, requirements || null]
  );

  return result.rows[0];
}

module.exports = { findAll, findById, create };
