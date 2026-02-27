import express from 'express';
import { body } from 'express-validator';
import { 
  getMessages, 
  getUnreadMessages,
  createMessage, 
  markAsRead, 
  deleteMessage,
  getMessageStats
} from '../controllers/messageController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, adminOnly, getMessages);
router.get('/unread', protect, adminOnly, getUnreadMessages);
router.get('/stats', protect, adminOnly, getMessageStats);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required')
  ],
  createMessage
);

router.put('/:id/read', protect, adminOnly, markAsRead);
router.delete('/:id', protect, adminOnly, deleteMessage);

export default router;
