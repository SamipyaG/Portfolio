require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    // ── Admin ──────────────────────────────────────────────────────────────
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      await Admin.create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
      console.log('✓ Admin created');
    } else {
      console.log('– Admin already exists');
    }

    // ── Profile ────────────────────────────────────────────────────────────
    await Profile.deleteMany({});
    await Profile.create({
      name: 'Samipya Ghimire',
      title: 'Full Stack MERN Developer',
      tagline: 'Building Scalable Backend Systems & Modern Web Apps',
      bio: [
        "I'm a Full Stack MERN Developer based in Biratnagar, Nepal, with a strong focus on Node.js backend systems. I specialize in building production-grade REST APIs, designing MongoDB schemas for scale, and implementing secure authentication flows.",
        "At G-Mana, I've worn multiple hats — backend developer, QA automation engineer, and production debugger. This breadth gives me a unique ability to see systems holistically and write code that's both maintainable and resilient.",
        "I write clean, modular JavaScript and TypeScript, follow SOLID principles, and believe strongly in code reviews, API documentation (Swagger/Postman), and test coverage as non-negotiable parts of any professional workflow.",
      ],
      photoUrl: '',
      email: 'samipya.ghimire.it@gmail.com',
      phone: '',
      location: 'Biratnagar, Nepal',
      linkedin: 'https://www.linkedin.com/in/samipya-ghimire-30abb7202',
      github: 'https://github.com/samipya',
      resumeUrl: '/resume.pdf',
      availability: { available: true, message: 'Available for opportunities' },
      stats: [
        { value: '1+', label: 'Year Experience' },
        { value: '5+', label: 'Projects Shipped' },
        { value: 'MERN', label: 'Core Stack' },
      ],
    });
    console.log('✓ Profile seeded');

    // ── Skills ─────────────────────────────────────────────────────────────
    await Skill.deleteMany({});
    await Skill.insertMany([
      // ── Highlighted (big cards) ──────────────────────────────────────────
      {
        name: 'Node.js',
        category: 'backend',
        isHighlight: true,
        iconKey: 'node',
        color: '#68a063',
        description: 'Server-side JavaScript runtime for building fast, scalable network applications. My primary backend tool for REST APIs, middleware pipelines, and business logic.',
        relatedTech: ['Express.js', 'REST APIs', 'JWT', 'MVC', 'Nodemon'],
        order: 1,
      },
      {
        name: 'React',
        category: 'frontend',
        isHighlight: true,
        iconKey: 'react',
        color: '#61dafb',
        description: 'Component-based UI library for building dynamic, interactive frontends. Used with hooks, context, and React Query for full state management.',
        relatedTech: ['Hooks', 'Context API', 'Redux', 'React Router', 'Vite'],
        order: 2,
      },
      {
        name: 'MongoDB',
        category: 'database',
        isHighlight: true,
        iconKey: 'mongodb',
        color: '#47a248',
        description: 'NoSQL document database at the core of my backend stack. Deep experience with Mongoose schemas, aggregation pipelines, and query optimization.',
        relatedTech: ['Mongoose', 'Aggregation Pipeline', 'Indexes', 'Atlas', 'Compass'],
        order: 3,
      },
      {
        name: 'Docker',
        category: 'devops',
        isHighlight: true,
        iconKey: 'docker',
        color: '#2496ed',
        description: 'Containerization platform for packaging applications and dependencies into portable, consistent environments across development and production.',
        relatedTech: ['Dockerfile', 'Docker Compose', 'Images', 'Containers', 'Volumes'],
        order: 4,
      },
      {
        name: 'Kubernetes',
        category: 'devops',
        isHighlight: true,
        iconKey: 'kubernetes',
        color: '#326ce5',
        description: 'Container orchestration system for automating deployment, scaling, and management of containerized applications in production clusters.',
        relatedTech: ['Pods', 'Services', 'Deployments', 'kubectl', 'Helm'],
        order: 5,
      },
      // ── Normal tags ──────────────────────────────────────────────────────
      { name: 'Express.js', category: 'backend', isHighlight: false, order: 10 },
      { name: 'JavaScript ES6+', category: 'backend', isHighlight: false, order: 11 },
      { name: 'TypeScript', category: 'frontend', isHighlight: false, order: 12 },
      { name: 'Tailwind CSS', category: 'frontend', isHighlight: false, order: 13 },
      { name: 'Ant Design', category: 'frontend', isHighlight: false, order: 14 },
      { name: 'Redux', category: 'frontend', isHighlight: false, order: 15 },
      { name: 'MySQL', category: 'database', isHighlight: false, order: 16 },
      { name: 'Prisma', category: 'database', isHighlight: false, order: 17 },
      { name: 'Playwright', category: 'qa', isHighlight: false, order: 18 },
      { name: 'Postman', category: 'qa', isHighlight: false, order: 19 },
      { name: 'Swagger', category: 'qa', isHighlight: false, order: 20 },
      { name: 'Git', category: 'other', isHighlight: false, order: 21 },
      { name: 'Jira', category: 'other', isHighlight: false, order: 22 },
      { name: 'Agile/Scrum', category: 'other', isHighlight: false, order: 23 },
      { name: 'REST API Design', category: 'backend', isHighlight: false, order: 24 },
      { name: 'JWT Auth', category: 'backend', isHighlight: false, order: 25 },
    ]);
    console.log('✓ Skills seeded');

    // ── Experience ─────────────────────────────────────────────────────────
    await Experience.deleteMany({});
    await Experience.insertMany([
      {
        role: 'Backend Developer',
        company: 'G-Mana',
        period: 'Dec 2023 – Present',
        type: 'Full-time',
        color: '#4f8ef7',
        order: 1,
        achievements: [
          'Architected and maintained Node.js/Express REST APIs serving core product features, handling thousands of daily requests with consistent sub-200ms response times.',
          'Designed and optimized MongoDB schemas using Mongoose — implemented compound indexes and aggregation pipelines that reduced query times by 40%.',
          'Implemented JWT-based authentication and authorization middleware with token refresh flows, securing all protected routes.',
          'Drove backend code reviews, enforcing clean MVC patterns, input validation, and centralized error handling across the team.',
          'Improved API performance by identifying N+1 query patterns and refactoring to batched database operations.',
        ],
        tech: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'REST APIs', 'Git'],
      },
      {
        role: 'Support, Test & Automation Specialist',
        company: 'G-Mana',
        period: 'Dec 2023 – Present',
        type: 'Concurrent Role',
        color: '#8b5cf6',
        order: 2,
        achievements: [
          'Built a comprehensive Playwright end-to-end test suite covering 60+ critical user flows, significantly reducing manual regression cycles.',
          'Diagnosed and resolved production bugs through systematic log analysis, network inspection, and database query tracing.',
          'Maintained API test collections in Postman and Swagger documentation, keeping them synchronized with backend changes.',
          'Collaborated with the product team via Jira in an Agile/Scrum workflow — managed sprint tasks, wrote bug reports, and participated in retrospectives.',
          'Performed manual and regression testing across releases, defining test cases and acceptance criteria.',
        ],
        tech: ['Playwright', 'Postman', 'Swagger', 'Jira', 'Git', 'Agile/Scrum'],
      },
    ]);
    console.log('✓ Experiences seeded');

    // ── Projects ───────────────────────────────────────────────────────────
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany([
        {
          title: 'Employee Management System',
          shortDescription: 'Full-stack MERN app with role-based access control and real-time operations.',
          description: 'A comprehensive employee management platform built with the MERN stack. Features JWT authentication, RBAC, complete CRUD, and real-time data updates. Backend uses Express with clean MVC, optimized MongoDB queries, and secure middleware pipelines.',
          techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Ant Design', 'Tailwind CSS'],
          githubUrl: 'https://github.com/samipya',
          featured: true, order: 1, category: 'fullstack',
        },
        {
          title: 'Expense Management System',
          shortDescription: 'MERN application with Redux state management and interactive financial analytics.',
          description: 'A full-featured expense tracking app with income/expense categorization, chart-based analytics dashboards, and Redux-powered state management. RESTful Node.js/Express backend with optimized MongoDB schemas and interactive React data visualizations.',
          techStack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'Tailwind CSS'],
          githubUrl: 'https://github.com/samipya',
          featured: true, order: 2, category: 'fullstack',
        },
      ]);
      console.log('✓ Projects seeded');
    } else {
      console.log(`– ${count} projects already exist`);
    }

    console.log('\n🎉 Seeding complete!');
    console.log(`Admin: ${process.env.ADMIN_EMAIL} / ${process.env.ADMIN_PASSWORD}`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
