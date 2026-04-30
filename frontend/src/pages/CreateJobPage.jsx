import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createJob } from '../services/api';

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote'];

const initialForm = {
  title: '', company: '', location: '', type: '',
  salary_min: '', salary_max: '', description: '', requirements: '',
};

function validateForm(form) {
  const errors = {};
  if (!form.title.trim()) errors.title = 'Title is required.';
  if (!form.company.trim()) errors.company = 'Company is required.';
  if (!form.location.trim()) errors.location = 'Location is required.';
  if (!form.type) errors.type = 'Please select a job type.';
  if (!form.description.trim()) errors.description = 'Description is required.';
  else if (form.description.trim().length < 10) errors.description = 'Description must be at least 10 characters.';
  if (form.salary_min && (isNaN(form.salary_min) || Number(form.salary_min) < 0))
    errors.salary_min = 'Must be a non-negative number.';
  if (form.salary_max && (isNaN(form.salary_max) || Number(form.salary_max) < 0))
    errors.salary_max = 'Must be a non-negative number.';
  if (form.salary_min && form.salary_max && Number(form.salary_min) > Number(form.salary_max))
    errors.salary_max = 'Max salary must be greater than min.';
  return errors;
}

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerErrors([]);

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        requirements: form.requirements || null,
      };
      await createJob(payload);
      setShowToast(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setServerErrors(err.errors || ['Something went wrong. Please try again.']);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="container">
      <div className="form-page">
        <Link to="/" className="back-link">← Back to all jobs</Link>
        <h1>Post a New Job</h1>
        <p className="form-subtitle">Fill in the details below to publish your job listing.</p>

        {serverErrors.length > 0 && (
          <div className="form-errors-banner">
            <h3>⚠️ Please fix the following errors:</h3>
            <ul>{serverErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </div>
        )}

        <div className="form-card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Job Title <span className="required">*</span></label>
              <input id="title" name="title" type="text" className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="e.g. Senior Frontend Developer" value={form.title} onChange={handleChange} />
              {errors.title && <div className="form-error">⚠ {errors.title}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company" className="form-label">Company <span className="required">*</span></label>
                <input id="company" name="company" type="text" className={`form-input ${errors.company ? 'error' : ''}`}
                  placeholder="e.g. TechVision Co." value={form.company} onChange={handleChange} />
                {errors.company && <div className="form-error">⚠ {errors.company}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="location" className="form-label">Location <span className="required">*</span></label>
                <input id="location" name="location" type="text" className={`form-input ${errors.location ? 'error' : ''}`}
                  placeholder="e.g. Bangkok, Thailand" value={form.location} onChange={handleChange} />
                {errors.location && <div className="form-error">⚠ {errors.location}</div>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label">Job Type <span className="required">*</span></label>
              <select id="type" name="type" className={`form-select ${errors.type ? 'error' : ''}`}
                value={form.type} onChange={handleChange}>
                <option value="">Select a type...</option>
                {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.type && <div className="form-error">⚠ {errors.type}</div>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="salary_min" className="form-label">Min Salary (THB)</label>
                <input id="salary_min" name="salary_min" type="number" className={`form-input ${errors.salary_min ? 'error' : ''}`}
                  placeholder="e.g. 50000" value={form.salary_min} onChange={handleChange} min="0" />
                {errors.salary_min && <div className="form-error">⚠ {errors.salary_min}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="salary_max" className="form-label">Max Salary (THB)</label>
                <input id="salary_max" name="salary_max" type="number" className={`form-input ${errors.salary_max ? 'error' : ''}`}
                  placeholder="e.g. 100000" value={form.salary_max} onChange={handleChange} min="0" />
                {errors.salary_max && <div className="form-error">⚠ {errors.salary_max}</div>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description <span className="required">*</span></label>
              <textarea id="description" name="description" className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                value={form.description} onChange={handleChange} rows={5} />
              {errors.description && <div className="form-error">⚠ {errors.description}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="requirements" className="form-label">Requirements</label>
              <textarea id="requirements" name="requirements" className="form-textarea"
                placeholder="List each requirement on a new line&#10;e.g. 3+ years of React experience&#10;Strong TypeScript skills"
                value={form.requirements} onChange={handleChange} rows={4} />
            </div>

            <button type="submit" className="form-submit" disabled={submitting}>
              {submitting ? '⏳ Publishing...' : '🚀 Publish Job'}
            </button>
          </form>
        </div>
      </div>

      {showToast && <div className="toast">✅ Job published successfully! Redirecting...</div>}
    </main>
  );
}
