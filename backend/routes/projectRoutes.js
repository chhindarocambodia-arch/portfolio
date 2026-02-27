import express from 'express';
import { body } from 'express-validator';
import { 
  getProjects, 
  getProject, 
  getFeaturedProjects,
  createProject, 
  updateProject, 
  deleteProject,
  getProjectStats
} from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/stats', protect, adminOnly, getProjectStats);
router.get('/:id', getProject);

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('tech_stack').isArray().withMessage('Tech stack must be an array')
  ],
  createProject
);

router.put(
  '/:id',
  protect,
  adminOnly,
  upload.single('image'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('tech_stack').isArray().withMessage('Tech stack must be an array')
  ],
  updateProject
);

router.delete('/:id', protect, adminOnly, deleteProject);

export default router;
