import express from 'express';
import * as adminController from '../controllers/adminController.js';
import auth from '../middleware/Auth.js';

const router = express.Router();

// ✅ Public route: Admin login
router.post('/login', adminController.adminLogin);

// ✅ Protected routes (require JWT)
router.get('/articles', auth, adminController.getAllArticlesAdmin);
router.get('/comments', auth, adminController.getAllComments);
router.get('/dashboard', auth, adminController.getDashboard);

// ✅ Comment actions
router.delete('/comments', auth, adminController.deleteCommentById);
router.put('/comments/approve', auth, adminController.approveCommentById);

export default router;