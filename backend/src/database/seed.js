require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const { pool } = require('../config/database');

const SEED_JOBS = [
  {
    title: 'Senior Frontend Developer',
    company: 'TechVision Co., Ltd.',
    location: 'Bangkok, Thailand',
    type: 'Full-time',
    salary_min: 80000,
    salary_max: 120000,
    description: 'We are looking for a Senior Frontend Developer to lead the development of our customer-facing web applications. You will work closely with designers and backend engineers to deliver pixel-perfect, high-performance user interfaces using React and TypeScript.',
    requirements: '5+ years of frontend development experience\nStrong proficiency in React, TypeScript, and modern CSS\nExperience with state management (Redux, Zustand)\nFamiliarity with CI/CD pipelines and automated testing\nExcellent communication skills in English',
  },
  {
    title: 'Backend Engineer (Node.js)',
    company: 'FinNext Solutions',
    location: 'Chiang Mai, Thailand',
    type: 'Full-time',
    salary_min: 70000,
    salary_max: 110000,
    description: 'Join our fintech team to build scalable microservices powering digital payment solutions across Southeast Asia. You will design and implement RESTful APIs, optimize database performance, and ensure system reliability for millions of transactions.',
    requirements: '3+ years experience with Node.js and Express/NestJS\nStrong knowledge of PostgreSQL or MySQL\nExperience with message queues (RabbitMQ, Kafka)\nUnderstanding of financial systems and security best practices\nDocker and Kubernetes experience is a plus',
  },
  {
    title: 'UX/UI Designer',
    company: 'Creative Studio BKK',
    location: 'Bangkok, Thailand',
    type: 'Full-time',
    salary_min: 50000,
    salary_max: 80000,
    description: 'We need a creative UX/UI Designer to craft beautiful, intuitive interfaces for mobile and web applications. You will conduct user research, create wireframes and prototypes, and collaborate with developers to bring designs to life.',
    requirements: '3+ years of UX/UI design experience\nProficiency in Figma and Adobe Creative Suite\nStrong portfolio demonstrating mobile and web design projects\nUnderstanding of design systems and accessibility standards\nExperience with user research and usability testing',
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudFirst Asia',
    location: 'Remote',
    type: 'Remote',
    salary_min: 90000,
    salary_max: 150000,
    description: 'As a DevOps Engineer, you will manage our cloud infrastructure on AWS, automate deployment pipelines, and ensure high availability for our SaaS products. You will implement monitoring, alerting, and incident response processes.',
    requirements: 'Strong experience with AWS (EC2, ECS, Lambda, RDS)\nProficiency in Terraform and Infrastructure as Code\nExperience with CI/CD tools (GitHub Actions, Jenkins)\nKnowledge of containerization (Docker, Kubernetes)\nStrong scripting skills (Bash, Python)',
  },
  {
    title: 'Junior Data Analyst',
    company: 'DataDriven Co.',
    location: 'Bangkok, Thailand',
    type: 'Full-time',
    salary_min: 30000,
    salary_max: 45000,
    description: 'We are seeking a Junior Data Analyst to support our business intelligence team. You will analyze datasets, create dashboards, and generate insights that drive strategic decisions for our e-commerce platform.',
    requirements: '0–2 years of data analysis experience\nProficiency in SQL and Excel\nFamiliarity with BI tools (Tableau, Power BI, or Looker)\nBasic knowledge of Python or R for data manipulation\nStrong analytical and problem-solving skills',
  },
  {
    title: 'Mobile Developer (React Native)',
    company: 'AppForge Thailand',
    location: 'Phuket, Thailand',
    type: 'Contract',
    salary_min: 60000,
    salary_max: 95000,
    description: 'Contract opportunity to build a cross-platform mobile application for the hospitality industry. You will develop features for booking management, real-time notifications, and payment integration using React Native.',
    requirements: '2+ years of React Native development\nExperience publishing apps to App Store and Google Play\nKnowledge of native modules and bridging\nFamiliarity with RESTful APIs and WebSocket\n6-month contract with potential for extension',
  },
  {
    title: 'Product Manager',
    company: 'InnoHub Digital',
    location: 'Bangkok, Thailand',
    type: 'Full-time',
    salary_min: 80000,
    salary_max: 130000,
    description: 'Lead the product development lifecycle for our B2B SaaS platform. You will define product roadmaps, prioritize features based on user feedback and business goals, and work cross-functionally with engineering, design, and marketing teams.',
    requirements: '4+ years of product management experience\nExperience with agile/scrum methodologies\nStrong data-driven decision-making skills\nExcellent stakeholder management and communication\nExperience in B2B SaaS is highly preferred',
  },
  {
    title: 'QA Automation Engineer',
    company: 'QualityTech Labs',
    location: 'Nonthaburi, Thailand',
    type: 'Full-time',
    salary_min: 55000,
    salary_max: 85000,
    description: 'Build and maintain automated test suites for web and mobile applications. You will design test strategies, write end-to-end tests, and integrate testing into CI/CD pipelines to ensure product quality.',
    requirements: '2+ years of QA automation experience\nProficiency in Cypress, Playwright, or Selenium\nExperience with API testing (Postman, RestAssured)\nKnowledge of test design patterns and best practices\nFamiliarity with JavaScript or TypeScript',
  },
  {
    title: 'Part-time Content Writer',
    company: 'MediaPulse Agency',
    location: 'Remote',
    type: 'Part-time',
    salary_min: 15000,
    salary_max: 25000,
    description: 'Write engaging blog posts, social media content, and marketing copy for technology clients. Flexible hours with the ability to work from anywhere. Perfect for writers who are passionate about tech and digital trends.',
    requirements: 'Excellent writing skills in English and Thai\nExperience writing about technology topics\nAbility to meet deadlines and manage multiple assignments\nFamiliarity with SEO best practices\nPortfolio of published articles required',
  },
  {
    title: 'Full Stack Developer',
    company: 'NextGen Systems',
    location: 'Khon Kaen, Thailand',
    type: 'Full-time',
    salary_min: 65000,
    salary_max: 100000,
    description: 'Join our growing team to develop end-to-end web applications for enterprise clients. You will work with modern technologies including React, Node.js, and PostgreSQL, and participate in system architecture decisions.',
    requirements: '3+ years of full-stack development experience\nProficiency in React and Node.js\nStrong database skills (PostgreSQL or MySQL)\nExperience with Git and collaborative development workflows\nAbility to work independently and in a team environment',
  },
];

async function seed() {
  console.log('🌱 Seeding database with sample jobs...');

  const insertQuery = `
    INSERT INTO jobs (title, company, location, type, salary_min, salary_max, description, requirements)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  try {
    for (const job of SEED_JOBS) {
      await pool.query(insertQuery, [
        job.title,
        job.company,
        job.location,
        job.type,
        job.salary_min,
        job.salary_max,
        job.description,
        job.requirements,
      ]);
      console.log(`  ✓ Added: ${job.title} at ${job.company}`);
    }

    console.log(`✅ Seeding completed — ${SEED_JOBS.length} jobs inserted.`);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
