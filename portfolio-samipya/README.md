# Samipya Ghimire — Portfolio Website

Production-grade MERN stack portfolio with an admin dashboard, contact form, and dynamic project management.

**Live:** `https://samipya.dev` | **Backend:** `https://api.samipya.dev`

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite, Tailwind CSS, Framer Motion, React Query |
| Backend | Node.js, Express.js, MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Security | Helmet, CORS, Rate Limiting, express-validator |
| Deploy | Vercel (frontend) + Render (backend) + MongoDB Atlas |

---

## Folder Structure

```
portfolio-samipya/
├── client/                          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/              # Navbar, Footer
│   │   │   ├── ui/                  # SectionWrapper, SectionHeader, SkeletonCard
│   │   │   ├── home/                # Hero, About, Skills, Experience, Projects, Contact, Resume
│   │   │   └── admin/               # ProjectForm
│   │   ├── pages/                   # Home, AdminLogin, AdminDashboard
│   │   ├── hooks/                   # useProjects, useContact
│   │   ├── services/                # api.js (axios instance)
│   │   ├── context/                 # AuthContext
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── package.json
│
└── server/                          # Node.js + Express backend
    ├── models/                      # Project.js, ContactMessage.js, Admin.js
    ├── routes/                      # projects.js, contact.js, admin.js
    ├── controllers/                 # projectController, contactController, adminController
    ├── middleware/                  # auth.js, errorHandler.js, validate.js
    ├── config/                      # db.js
    ├── utils/                       # seed.js
    ├── server.js
    ├── .env.example
    └── package.json
```

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd portfolio-samipya

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### 2. Configure Environment Variables

**Backend** — `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@samipya.dev
ADMIN_PASSWORD=YourSecurePassword123!
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend** — `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

This creates the admin user and seedes sample projects.

### 4. Run Development Servers

```bash
# Terminal 1 — Backend (port 5000)
cd server && npm run dev

# Terminal 2 — Frontend (port 5173)
cd client && npm run dev
```

Open: `http://localhost:5173`  
Admin panel: `http://localhost:5173/admin/login`

---

## API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects?featured=true` | Featured projects only |
| GET | `/api/projects/:id` | Single project |
| POST | `/api/contact` | Submit contact form |

### Admin (requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Get JWT token |
| GET | `/api/admin/me` | Current admin info |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/contact` | List all messages |
| PATCH | `/api/contact/:id/read` | Mark as read |
| DELETE | `/api/contact/:id` | Delete message |

---

## Deployment

### MongoDB Atlas
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with read/write permissions
3. Whitelist `0.0.0.0/0` (for Render) in Network Access
4. Copy the connection string to your backend `.env`

### Render (Backend)
1. Push code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set:
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `npm start`
4. Add all environment variables from `server/.env`
5. After first deploy, run the seed script once via Render's Shell

### Vercel (Frontend)
1. Import the repo at [vercel.com](https://vercel.com)
2. Set:
   - Root directory: `client`
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add environment variable:
   - `VITE_API_URL` = your Render backend URL + `/api`
4. Deploy

---

## Security Features

- **Helmet** — sets secure HTTP headers
- **CORS** — origin-restricted to frontend URL
- **Rate Limiting** — 200 req/15min globally, 5/hr on contact form, 10/15min on login
- **JWT** — HS256 signed tokens with 7-day expiry, never stored in cookies
- **bcrypt** — passwords hashed with salt rounds of 12
- **express-validator** — input validation on all write endpoints
- **Body size limit** — 10kb max payload

---

## Admin Login

Default credentials set via environment variables:
- Email: `ADMIN_EMAIL`
- Password: `ADMIN_PASSWORD`

**Change these before deploying to production.**

---

Built by Samipya Ghimire · [LinkedIn](https://www.linkedin.com/in/samipya-ghimire-30abb7202)
