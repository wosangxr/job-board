const { Router } = require('express');
const { getJobs, getJobById, createJob } = require('../controllers/jobController');
const { validateCreateJob } = require('../middleware/validate');

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', validateCreateJob, createJob);

module.exports = router;
