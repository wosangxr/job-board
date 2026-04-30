const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Fetch all jobs with optional query parameters.
 * @param {Object} params - { search, location, type, page, limit }
 * @returns {Promise<{ jobs: Array, total: number, page: number, totalPages: number }>}
 */
export async function fetchJobs(params = {}) {
  const query = new URLSearchParams();

  if (params.search) query.set('search', params.search);
  if (params.location) query.set('location', params.location);
  if (params.type) query.set('type', params.type);
  if (params.page) query.set('page', params.page);
  if (params.limit) query.set('limit', params.limit);

  const url = `${API_URL}/jobs${query.toString() ? `?${query}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single job by ID.
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function fetchJobById(id) {
  const response = await fetch(`${API_URL}/jobs/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch job: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create a new job.
 * @param {Object} jobData
 * @returns {Promise<Object>} The created job or validation errors
 */
export async function createJob(jobData) {
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error('Validation failed');
    error.status = response.status;
    error.errors = data.errors || [data.error || 'Something went wrong'];
    throw error;
  }

  return data;
}
