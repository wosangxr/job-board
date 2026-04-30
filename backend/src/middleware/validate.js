const VALID_JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote'];

/**
 * Middleware to validate the request body for creating a new job.
 * Returns 400 with an array of error messages if validation fails.
 */
function validateCreateJob(req, res, next) {
  const errors = [];
  const { title, company, location, type, salary_min, salary_max, description } = req.body;

  // Required string fields
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required.');
  } else if (title.trim().length > 255) {
    errors.push('Title must be 255 characters or less.');
  }

  if (!company || typeof company !== 'string' || company.trim().length === 0) {
    errors.push('Company is required.');
  } else if (company.trim().length > 255) {
    errors.push('Company must be 255 characters or less.');
  }

  if (!location || typeof location !== 'string' || location.trim().length === 0) {
    errors.push('Location is required.');
  } else if (location.trim().length > 255) {
    errors.push('Location must be 255 characters or less.');
  }

  if (!type || typeof type !== 'string') {
    errors.push('Job type is required.');
  } else if (!VALID_JOB_TYPES.includes(type)) {
    errors.push(`Job type must be one of: ${VALID_JOB_TYPES.join(', ')}.`);
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Description is required.');
  } else if (description.trim().length < 10) {
    errors.push('Description must be at least 10 characters.');
  }

  // Optional numeric fields
  if (salary_min !== undefined && salary_min !== null && salary_min !== '') {
    const min = Number(salary_min);
    if (!Number.isInteger(min) || min < 0) {
      errors.push('Minimum salary must be a non-negative integer.');
    }
  }

  if (salary_max !== undefined && salary_max !== null && salary_max !== '') {
    const max = Number(salary_max);
    if (!Number.isInteger(max) || max < 0) {
      errors.push('Maximum salary must be a non-negative integer.');
    }
  }

  if (
    salary_min !== undefined && salary_min !== null && salary_min !== '' &&
    salary_max !== undefined && salary_max !== null && salary_max !== ''
  ) {
    if (Number(salary_min) > Number(salary_max)) {
      errors.push('Minimum salary cannot be greater than maximum salary.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Sanitize: trim strings
  req.body.title = title.trim();
  req.body.company = company.trim();
  req.body.location = location.trim();
  req.body.description = description.trim();
  if (req.body.requirements) {
    req.body.requirements = req.body.requirements.trim();
  }
  if (salary_min !== undefined && salary_min !== null && salary_min !== '') {
    req.body.salary_min = Number(salary_min);
  } else {
    req.body.salary_min = null;
  }
  if (salary_max !== undefined && salary_max !== null && salary_max !== '') {
    req.body.salary_max = Number(salary_max);
  } else {
    req.body.salary_max = null;
  }

  next();
}

module.exports = { validateCreateJob };
