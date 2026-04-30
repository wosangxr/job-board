import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobById } from '../services/api';

function formatSalary(min, max) {
  const fmt = (n) => n?.toLocaleString();
  if (min && max) return `฿${fmt(min)} – ฿${fmt(max)} / month`;
  if (min) return `From ฿${fmt(min)} / month`;
  if (max) return `Up to ฿${fmt(max)} / month`;
  return 'Negotiable';
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchJobById(id);
        if (!data) {
          setNotFound(true);
        } else {
          setJob(data);
          document.title = `${data.title} at ${data.company} — JobBoard`;
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { document.title = 'JobBoard'; };
  }, [id]);

  if (loading) {
    return (
      <main className="container">
        <div className="job-detail">
          <div className="skeleton-card" style={{ padding: '2.5rem' }}>
            <div className="skeleton-line w-40" />
            <div className="skeleton-line w-80 h-lg" />
            <div className="skeleton-line w-60" />
            <div className="skeleton-line w-full" style={{ marginTop: '2rem' }} />
            <div className="skeleton-line w-full" />
            <div className="skeleton-line w-80" />
          </div>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="container">
        <div className="not-found">
          <h1>404</h1>
          <p>The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-post-job">← Back to Jobs</Link>
        </div>
      </main>
    );
  }

  const requirementsList = job.requirements
    ? job.requirements.split('\n').filter((r) => r.trim())
    : [];

  return (
    <main className="container">
      <div className="job-detail">
        <Link to="/" className="back-link">← Back to all jobs</Link>

        <article className="job-detail-card">
          <div className="job-detail-company">{job.company}</div>
          <h1 className="job-detail-title">{job.title}</h1>

          <div className="job-detail-tags">
            <span className="meta-tag type-badge">{job.type}</span>
            <span className="meta-tag">📍 {job.location}</span>
            <span className="meta-tag">💰 {formatSalary(job.salary_min, job.salary_max)}</span>
          </div>

          <section className="job-detail-section">
            <h2>📋 Job Description</h2>
            <p>{job.description}</p>
          </section>

          {requirementsList.length > 0 && (
            <section className="job-detail-section">
              <h2>✅ Requirements</h2>
              <ul>
                {requirementsList.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>
          )}

          <button className="btn-apply" onClick={() => alert('Application feature coming soon!')}>
            🚀 Apply Now
          </button>

          <div className="job-detail-date">
            Posted on {formatDate(job.created_at)}
          </div>
        </article>
      </div>
    </main>
  );
}
