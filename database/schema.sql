-- Create Database
CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    tech_stack JSON NOT NULL,
    image VARCHAR(500),
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    icon VARCHAR(100),
    proficiency INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Admin User (Password: admin123 - hashed with bcrypt)
-- Default admin: admin@portfolio.com / admin123
INSERT INTO users (email, password, name, role) VALUES 
('admin@portfolio.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYAKW3dq/W6', 'Admin', 'admin');

-- Insert Sample Projects
INSERT INTO projects (title, description, category, tech_stack, image, live_url, github_url, featured) VALUES
('E-Commerce Platform', 'A full-featured e-commerce platform with shopping cart, payment integration, admin dashboard, and real-time inventory management.', 'fullstack', '["React", "Node.js", "Express", "MongoDB", "Stripe", "Redux"]', '/uploads/project1.jpg', 'https://demo-ecommerce.com', 'https://github.com/developer/ecommerce', true),
('Task Management App', 'Collaborative task management application with real-time updates, team workspaces, and Kanban boards.', 'fullstack', '["React", "TypeScript", "Firebase", "Material-UI"]', '/uploads/project2.jpg', 'https://taskmanager.app', 'https://github.com/developer/taskmanager', true),
('Portfolio Website', 'Personal portfolio website with smooth animations, dark mode, and responsive design.', 'frontend', '["React", "Tailwind CSS", "Framer Motion"]', '/uploads/project3.jpg', 'https://myportfolio.dev', 'https://github.com/developer/portfolio', false),
('Social Media Dashboard', 'Analytics dashboard for social media management with charts, reports, and scheduling features.', 'fullstack', '["Next.js", "PostgreSQL", "Chart.js", "Auth0"]', '/uploads/project4.jpg', 'https://socialdash.io', 'https://github.com/developer/socialdash', true),
('Weather Application', 'Beautiful weather app with location-based forecasts, hourly/daily views, and severe weather alerts.', 'frontend', '["React", "OpenWeather API", "Leaflet"]', '/uploads/project5.jpg', 'https://weatherapp.com', 'https://github.com/developer/weather', false),
('Restaurant Reservation System', 'Online reservation system for restaurants with table management, menu display, and customer reviews.', 'fullstack', '["Vue.js", "Laravel", "MySQL", "Stripe"]', '/uploads/project6.jpg', 'https://reservate.com', 'https://github.com/developer/restaurant', false);

-- Insert Sample Skills
INSERT INTO skills (name, category, icon, proficiency) VALUES
-- Frontend
('React', 'frontend', 'react', 95),
('JavaScript', 'frontend', 'javascript', 95),
('TypeScript', 'frontend', 'typescript', 90),
('HTML5', 'frontend', 'html5', 95),
('CSS3', 'frontend', 'css3', 90),
('Tailwind CSS', 'frontend', 'tailwind', 92),
('Next.js', 'frontend', 'nextjs', 88),
('Vue.js', 'frontend', 'vue', 80),
-- Backend
('Node.js', 'backend', 'nodejs', 92),
('Express.js', 'backend', 'express', 90),
('Python', 'backend', 'python', 85),
('REST APIs', 'backend', 'api', 92),
('GraphQL', 'backend', 'graphql', 75),
('Authentication', 'backend', 'auth', 88),
-- Database
('MySQL', 'database', 'mysql', 85),
('PostgreSQL', 'database', 'postgresql', 82),
('MongoDB', 'database', 'mongodb', 88),
('Redis', 'database', 'redis', 75),
-- Tools
('Git', 'tools', 'git', 95),
('Docker', 'tools', 'docker', 80),
('AWS', 'tools', 'aws', 78),
('VS Code', 'tools', 'vscode', 95),
('Figma', 'tools', 'figma', 75),
('Linux', 'tools', 'linux', 80);

-- Insert Sample Messages
INSERT INTO messages (name, email, subject, message, read) VALUES
('John Smith', 'john@example.com', 'Project Inquiry', 'Hi, I came across your portfolio and Im impressed with your work. I have a web development project that Id like to discuss with you. Are you available for a call this week?', true),
('Sarah Johnson', 'sarah@techcorp.com', 'Job Opportunity', 'We are looking for a full-stack developer to join our team. Your experience looks great. Would you be interested in discussing this opportunity?', false),
('Mike Wilson', 'mike@startup.io', 'Freelance Project', 'Hey! We need help building a React application for our startup. Its an e-commerce platform. Let me know if you are interested.', false);
