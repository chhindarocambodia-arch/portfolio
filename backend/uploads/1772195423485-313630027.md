# DevPortfolio - Full Stack Developer Portfolio

A production-ready full-stack portfolio application with admin dashboard.

## Features

- Modern, responsive UI with dark/light mode
- JWT authentication
- Admin dashboard for content management
- Project & message management (CRUD)
- Smooth animations with Framer Motion
- Clean architecture with MVC pattern

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router

### Backend
- Node.js + Express.js
- JWT Authentication
- Bcrypt password hashing
- MySQL

## Project Structure

```
portfolio/
├── backend/
│   ├── config/         # Database config
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Auth, error handling, upload
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── uploads/        # Uploaded files
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context
│   │   ├── services/   # API services
│   │   └── main.jsx    # Entry point
│   └── index.html
└── database/
    └── schema.sql      # Database schema
```

## Prerequisites

- Node.js 18+
- MySQL 8.0+

## Setup Instructions

### 1. Clone & Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Database Setup

```bash
# Create MySQL database
mysql -u root -p < database/schema.sql

# Or import via phpMyAdmin/MySQL Workbench
```

### 3. Environment Configuration

Edit `backend/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio
DB_PORT=3306

JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

PORT=5000
NODE_ENV=development
```

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 5. Default Admin Login

```
Email: admin@portfolio.com
Password: admin123
```

## Deployment

### Backend (Render/Railway)

1. Push code to GitHub
2. Create new Web Service on Render
3. Set environment variables
4. Build command: `npm install`
5. Start command: `npm start`

### Frontend (Vercel/Netlify)

1. Create `frontend/vite.config.js` proxy config
2. Push to GitHub
3. Import project on Vercel
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | User login |
| POST | /api/auth/register | User registration |
| GET | /api/auth/me | Get current user |
| GET | /api/projects | Get all projects |
| GET | /api/projects/:id | Get project by ID |
| POST | /api/projects | Create project (admin) |
| PUT | /api/projects/:id | Update project (admin) |
| DELETE | /api/projects/:id | Delete project (admin) |
| POST | /api/messages | Submit contact form |
| GET | /api/messages | Get all messages (admin) |
| PUT | /api/messages/:id/read | Mark as read (admin) |
| DELETE | /api/messages/:id | Delete message (admin) |
| GET | /api/skills | Get all skills |
| POST | /api/skills | Add skill (admin) |

## Recommended Improvements

1. **Caching**: Implement Redis for API response caching
2. **Image Optimization**: Use Cloudinary/S3 for image storage
3. **Email**: Integrate SendGrid for contact form emails
4. **Analytics**: Add Google Analytics
5. **SEO**: Add react-helmet for meta tags
6. **Testing**: Add Jest + React Testing Library
7. **CI/CD**: GitHub Actions for automated deployments

## License

MIT License
