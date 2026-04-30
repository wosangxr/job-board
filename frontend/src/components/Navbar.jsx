import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" aria-label="JobBoard Home">
          💼 <span>JobBoard</span>
        </Link>
        <div className="navbar-links">
          <Link
            to="/"
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Browse Jobs
          </Link>
          <Link to="/post" className="btn-post-job">
            ＋ Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
}
