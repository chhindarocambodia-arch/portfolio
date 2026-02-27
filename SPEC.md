# Full Stack Developer Portfolio - Technical Specification

## Project Overview

**Project Name:** DevPortfolio Pro
**Type:** Full-stack Web Application (Portfolio + Admin Dashboard)
**Core Functionality:** A professional portfolio website showcasing projects, skills, and contact capabilities with a secure admin dashboard for content management.
**Target Users:** Potential employers, clients, and collaborators viewing a developer's work; Admin user managing portfolio content.

---

## Architecture

### Tech Stack
- **Frontend:** React 18 + Vite, Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js + Express.js, JWT Authentication, Bcrypt
- **Database:** MySQL (using MySQL2 driver)
- **Architecture Pattern:** MVC (Backend), Component-based (Frontend)

### Project Structure
```
portfolio/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.jsx
│   └── index.html
└── database/
    └── schema.sql
```

---

## UI/UX Specification

### Design System

#### Color Palette
**Light Mode:**
- Background Primary: `#FAFBFC`
- Background Secondary: `#FFFFFF`
- Text Primary: `#1A1D23`
- Text Secondary: `#5F6B7A`
- Accent Primary: `#6366F1` (Indigo)
- Accent Secondary: `#8B5CF6` (Violet)
- Accent Gradient: `linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)`
- Success: `#10B981`
- Error: `#EF4444`
- Border: `#E5E7EB`

**Dark Mode:**
- Background Primary: `#0F1117`
- Background Secondary: `#1A1D23`
- Text Primary: `#F8FAFC`
- Text Secondary: `#94A3B8`
- Accent Primary: `#818CF8`
- Accent Secondary: `#A78BFA`

#### Typography
- **Heading Font:** "Outfit", sans-serif (Google Fonts)
- **Body Font:** "DM Sans", sans-serif (Google Fonts)
- **Monospace:** "JetBrains Mono", monospace (for code)

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 56px / 3.5rem | 700 | 1.1 |
| H2 | 40px / 2.5rem | 600 | 1.2 |
| H3 | 28px / 1.75rem | 600 | 1.3 |
| H4 | 20px / 1.25rem | 500 | 1.4 |
| Body | 16px / 1rem | 400 | 1.6 |
| Small | 14px / 0.875rem | 400 | 1.5 |

#### Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px

#### Effects
- **Card Shadow (Light):** `0 4px 24px rgba(0, 0, 0, 0.06)`
- **Card Shadow (Dark):** `0 4px 24px rgba(0, 0, 0, 0.3)`
- **Glassmorphism:** `background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px);`
- **Border Radius:** 8px (small), 12px (medium), 16px (large), 24px (xl)
- **Transitions:** 300ms ease-out (default), 500ms ease-out (page)

---

### Pages & Components

#### 1. Navigation (Sticky Header)
- Logo (left): "DevPortfolio" with gradient text
- Nav Links (center): Home, About, Skills, Projects, Contact
- Actions (right): Dark/Light toggle, Admin button
- Mobile: Hamburger menu with slide-in drawer
- Scroll behavior: Transparent → Solid background on scroll

#### 2. Hero Section
- Full viewport height (100vh)
- Animated typing effect: "Full Stack Developer" / "React Expert" / "Problem Solver"
- Tagline: Brief professional summary
- CTA Buttons: "View Projects" (primary), "Contact Me" (secondary)
- Background: Subtle gradient mesh with floating geometric shapes
- Scroll indicator at bottom

#### 3. About Section
- Two-column layout (image + text)
- Profile image with gradient border
- Brief bio text
- Key stats: Years Experience, Projects Completed, Clients
- Download CV button

#### 4. Skills Section
- Categorized cards: Frontend, Backend, Database, Tools
- Skill items with icons and proficiency bars
- Hover effect: Scale + glow
- Categories displayed in a grid

#### 5. Projects Section
- Filter tabs by category
- Project cards in responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- Card content: Image, Title, Description, Tech stack tags, Links
- "View Details" modal/page
- Load more pagination

#### 6. Project Detail Page
- Hero image
- Project title and description
- Tech stack used
- Features list
- Live demo & GitHub links
- Related projects

#### 7. Contact Section
- Contact form: Name, Email, Subject, Message
- Social links: GitHub, LinkedIn, Email
- Form validation with error messages
- Success toast notification

#### 8. Footer
- Copyright text
- Quick links
- Social icons
- Back to top button

---

### Admin Dashboard Pages

#### 1. Admin Login
- Email + Password fields
- "Remember me" checkbox
- Error handling for invalid credentials

#### 2. Dashboard Home
- Stats cards: Total Projects, Total Messages, Recent Activity
- Quick actions
- Recent messages preview

#### 3. Projects Management
- Table view with search
- Add new project button
- Edit/Delete actions per row
- Image upload with preview
- Form fields: Title, Description, Category, Tech Stack, Image, Live URL, GitHub URL

#### 4. Messages Management
- Inbox view
- Read/Unread status
- Reply functionality
- Delete messages

---

## Database Schema

### Tables

#### users
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| name | VARCHAR(100) | NOT NULL |
| role | ENUM('admin', 'user') | DEFAULT 'user' |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP |

#### projects
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NOT NULL |
| category | VARCHAR(50) | NOT NULL |
| tech_stack | JSON | NOT NULL |
| image | VARCHAR(500) | NULL |
| live_url | VARCHAR(500) | NULL |
| github_url | VARCHAR(500) | NULL |
| featured | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP |

#### messages
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | NOT NULL |
| subject | VARCHAR(200) | NOT NULL |
| message | TEXT | NOT NULL |
| read | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

#### skills
| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL |
| category | VARCHAR(50) | NOT NULL |
| icon | VARCHAR(100) | NULL |
| proficiency | INT | DEFAULT 0 |

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Messages
- `POST /api/messages` - Submit contact form
- `GET /api/messages` - Get all messages (admin)
- `PUT /api/messages/:id/read` - Mark as read (admin)
- `DELETE /api/messages/:id` - Delete message (admin)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add skill (admin)
- `PUT /api/skills/:id` - Update skill (admin)
- `DELETE /api/skills/:id` - Delete skill (admin)

---

## Functionality Specification

### Authentication Flow
1. User registers → Password hashed with bcrypt (12 rounds) → JWT issued
2. User logs in → Credentials validated → JWT returned
3. Protected routes check JWT → Verify token → Allow/Deny access
4. Role check middleware for admin routes

### Form Validation (Frontend)
- Required fields checked
- Email format validation
- Min/Max length limits
- Real-time validation feedback

### Form Validation (Backend)
- Express-validator middleware
- Sanitize inputs
- Return structured error responses

### Image Upload
- Multer middleware for file handling
- Supported formats: jpg, jpeg, png, webp
- Max size: 5MB
- Stored in /uploads directory
- Served statically

---

## Animations & Interactions

### Framer Motion Animations
- **Page Load:** Staggered fade-in from bottom (0.1s delay between elements)
- **Scroll Reveal:** Elements animate in when entering viewport
- **Button Hover:** Scale 1.02, shadow increase
- **Card Hover:** Scale 1.03, translateY(-4px)
- **Modal:** Fade + scale from 0.95
- **Navigation:** Slide down on scroll

### Typing Effect
- Typewriter.js or custom React hook
- Typing speed: 100ms per character
- Delete speed: 50ms per character
- Pause: 2000ms between words
- Cursor blink: 500ms interval

### Loading States
- Skeleton loaders matching content layout
- Subtle pulse animation
- 300ms transition to content

---

## Acceptance Criteria

### Authentication
- [ ] Users can register with email/password
- [ ] Users can login and receive JWT
- [ ] Invalid credentials show error message
- [ ] Admin routes protected from regular users
- [ ] JWT expires after 7 days

### Public Site
- [ ] Hero typing animation works smoothly
- [ ] All sections scroll to correct position
- [ ] Dark/Light mode toggle works and persists
- [ ] Projects load from API
- [ ] Contact form submits and stores message
- [ ] Responsive on mobile/tablet/desktop

### Admin Dashboard
- [ ] Admin can login securely
- [ ] Dashboard shows correct statistics
- [ ] CRUD operations work for projects
- [ ] Image upload works
- [ ] Messages can be viewed and deleted
- [ ] Pagination works

### Performance
- [ ] First Contentful Paint < 1.5s
- [ ] No layout shift on load
- [ ] Images lazy loaded
- [ ] Smooth 60fps animations

### SEO
- [ ] Meta tags present
- [ ] Semantic HTML
- [ ] Alt text on images
- [ ] Proper heading hierarchy
