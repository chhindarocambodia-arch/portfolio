import express from 'express';
import { body } from 'express-validator';
import { 
  getSkills, 
  getSkill,
  createSkill, 
  updateSkill, 
  deleteSkill
} from '../controllers/skillController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSkills);
router.get('/:id', getSkill);

router.post(
  '/',
  protect,
  adminOnly,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('category').notEmpty().withMessage('Category is required')
  ],
  createSkill
);

router.put(
  '/:id',
  protect,
  adminOnly,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('category').notEmpty().withMessage('Category is required')
  ],
  updateSkill
);

router.delete('/:id', protect, adminOnly, deleteSkill);

export default router;
