import { Link } from 'react-router-dom';

function formatSalary(min, max) {
  const fmt = (n) => n?.toLocaleString();
  if (min && max) return `฿${fmt(min)} – ฿${fmt(max)}`;
  if (min) return `From ฿${fmt(min)}`;
  if (max) return `Up to ฿${fmt(max)}`;
  return null;
}

export default function JobCard({ job }) {
  const salary = formatSalary(job.salary_min, job.salary_max);

  return (
    <Link to={`/jobs/${job.id}`} className="job-card" id={`job-card-${job.id}`}>
      <div className="job-card-header">
        <span className="job-card-company">{job.company}</span>
      </div>
      <h3 className="job-card-title">{job.title}</h3>
      <div className="job-card-meta">
        <span className="meta-tag type-badge">{job.type}</span>
        <span className="meta-tag">📍 {job.location}</span>
        {salary && <span className="meta-tag">💰 {salary}</span>}
      </div>
    </Link>
  );
}
