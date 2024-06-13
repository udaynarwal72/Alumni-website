import { Router } from 'express';
import UserRouter from './UserRoutes.js';
import BlogRoutes from './BlogRoutes.js';
import AdminRoutes from './AdminRoutes.js';
import EventRoutes from './EventRoutes.js';
import CommentRoutes from './CommentRoutes.js';
import BookMarkRoutes from './BookMarkRoutes.js';
const router = Router();

// Setting up routes
router.use('/api/v1/user', UserRouter);
router.use('/api/v1/blog', BlogRoutes);
router.use('/api/v1/admin', AdminRoutes);
router.use('/api/v1/event', EventRoutes);
router.use('api/v1/user', CommentRoutes);
router.use('api/v1/bookmark', BookMarkRoutes);

export default router;
