const jobModel = require('../models/jobModel');

/**
 * GET /api/jobs
 * Retrieve all jobs with optional search, filter, and pagination.
 */
async function getJobs(req, res) {
  try {
    const { search, location, type, page = 1, limit = 10 } = req.query;

    const result = await jobModel.findAll({
      search,
      location,
      type,
      page: Math.max(1, parseInt(page, 10) || 1),
      limit: Math.min(50, Math.max(1, parseInt(limit, 10) || 10)),
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * GET /api/jobs/:id
 * Retrieve a single job by its ID.
 */
async function getJobById(req, res) {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
      return res.status(400).json({ error: 'Invalid job ID.' });
    }

    const job = await jobModel.findById(Number(id));

    if (!job) {
      return res.status(404).json({ error: 'Job not found.' });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * POST /api/jobs
 * Create a new job listing (body is pre-validated by middleware).
 */
async function createJob(req, res) {
  try {
    const job = await jobModel.create(req.body);
    return res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getJobs, getJobById, createJob };
