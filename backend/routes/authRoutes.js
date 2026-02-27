import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/setup', async (req, res) => {
  try {
    const pool = (await import('../config/db.js')).default;
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await pool.execute(
      'INSERT OR IGNORE INTO users (username, email, password) VALUES (?, ?, ?)',
      ['admin', 'admin@portfolio.com', hashedPassword]
    );
    
    res.json({ message: 'Admin user created', email: 'admin@portfolio.com', password: 'admin123' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required')
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
);

router.get('/me', protect, getMe);

export default router;
