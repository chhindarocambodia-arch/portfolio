import express from 'express';
import { getAllSettings, getSetting, updateSetting, uploadImage } from '../controllers/settingsController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getAllSettings);
router.get('/:section', getSetting);
router.put('/:section', protect, adminOnly, updateSetting);
router.post('/:section/image', protect, adminOnly, upload.single('image'), uploadImage);

export default router;
