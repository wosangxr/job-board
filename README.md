บอร์ดหางาน

# 💼 JobBoard — Full-Stack Job Board Application

A modern job board application where users can **browse listings**, **view job details**, and **post new jobs**.

Built with **Node.js/Express**, **React/Vite**, and **PostgreSQL**.

![Tech Stack](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![Tech Stack](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Tech Stack](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)

---

## 🚀 Features

### Core
- ✅ **Job Listings** — Browse all jobs as beautiful cards
- ✅ **Job Details** — Click a card to see full details, requirements, salary
- ✅ **Post a Job** — Create new job listings with validated form

### Bonus
- 🔍 **Search & Filter** — Search by title/company, filter by location and type
- 📄 **Pagination** — 6 jobs per page with smart pagination controls
- ✅ **Form Validation** — Real-time client-side + server-side validation
- 🐳 **Docker** — Run the entire stack with one command
- 🔎 **SEO** — Semantic HTML, meta tags, dynamic page titles

---

## 📁 Project Structure

```
job-board/
├── backend/
│   ├── src/
│   │   ├── config/database.js      # PostgreSQL connection pool
│   │   ├── controllers/jobController.js
│   │   ├── routes/jobRoutes.js
│   │   ├── models/jobModel.js       # Data access layer
│   │   ├── middleware/validate.js   # Input validation
│   │   ├── database/
│   │   │   ├── migrate.js           # Create tables
│   │   │   └── seed.js              # Insert 10 sample jobs
│   │   ├── app.js                   # Express setup
│   │   └── server.js                # Entry point
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── pages/                   # Page components (3 pages)
│   │   ├── services/api.js          # API client
│   │   ├── index.css                # Design system
│   │   ├── App.jsx                  # Router setup
│   │   └── main.jsx                 # Entry point
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🛠 Prerequisites

- **Node.js** 18+ (recommended: 20)
- **PostgreSQL** 14+ (or use Docker)
- **npm** 9+

**Or simply:**
- **Docker** & **Docker Compose**

---

## ⚡ Quick Start with Docker (Recommended)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/job-board.git
cd job-board

# Start everything
docker compose up --build

# The app will be available at:
# Frontend: http://localhost
# API:      http://localhost:3000/api
```

The database will be automatically created, migrated, and seeded with 10 sample jobs.

---

## 🔧 Manual Setup (Without Docker)

### 1. Setup PostgreSQL

Create a database:

```sql
CREATE DATABASE job_board;
```

### 2. Setup Backend

```bash
cd backend

# Copy environment variables
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=job_board
# DB_USER=postgres
# DB_PASSWORD=your_password

# Install dependencies
npm install

# Run migration (creates tables)
npm run migrate

# Seed the database (inserts 10 sample jobs)
npm run seed

# Start the API server
npm run dev
```

The API will be running at `http://localhost:3000`.

### 3. Setup Frontend

```bash
cd frontend

# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Start dev server
npm run dev
```

The frontend will be running at `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|-------------|
| `GET` | `/api/jobs` | List all jobs | `200` |
| `GET` | `/api/jobs/:id` | Get job by ID | `200`, `404` |
| `POST` | `/api/jobs` | Create a new job | `201`, `400` |
| `GET` | `/api/health` | Health check | `200` |

### Query Parameters for `GET /api/jobs`

| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Search by title or company |
| `location` | string | Filter by location |
| `type` | string | Filter by type (Full-time, Part-time, Contract, Remote) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10, max: 50) |

### Example Requests

```bash
# Get all jobs
curl http://localhost:3000/api/jobs

# Search by keyword
curl "http://localhost:3000/api/jobs?search=frontend"

# Filter by location and type
curl "http://localhost:3000/api/jobs?location=Bangkok&type=Full-time"

# Pagination
curl "http://localhost:3000/api/jobs?page=1&limit=5"

# Get a specific job
curl http://localhost:3000/api/jobs/1

# Create a new job
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Developer",
    "company": "My Company",
    "location": "Bangkok, Thailand",
    "type": "Full-time",
    "salary_min": 50000,
    "salary_max": 80000,
    "description": "We are looking for a talented React developer to join our team."
  }'
```

---

## 🗄 Database Schema

### Table: `jobs`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | SERIAL | PRIMARY KEY |
| `title` | VARCHAR(255) | NOT NULL |
| `company` | VARCHAR(255) | NOT NULL |
| `location` | VARCHAR(255) | NOT NULL |
| `type` | VARCHAR(50) | NOT NULL, CHECK (Full-time/Part-time/Contract/Remote) |
| `salary_min` | INTEGER | NULLABLE |
| `salary_max` | INTEGER | NULLABLE |
| `description` | TEXT | NOT NULL |
| `requirements` | TEXT | NULLABLE |
| `created_at` | TIMESTAMP | DEFAULT NOW() |
| `updated_at` | TIMESTAMP | DEFAULT NOW() |

---

## 🧪 Testing the API

```bash
# Health check
curl http://localhost:3000/api/health

# Should return all seeded jobs
curl http://localhost:3000/api/jobs

# Should return 404
curl http://localhost:3000/api/jobs/9999

# Should return 400 with validation errors
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## 📝 License

MIT
