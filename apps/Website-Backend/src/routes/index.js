import { Router } from 'express';
import UserRouter from './UserRoutes.js';
import BlogRoutes from './BlogRoutes.js';
import AdminRoutes from './AdminRoutes.js';
import EventRoutes from './EventRoutes.js';
import CommentRoutes from './CommentRoutes.js';
import BookMarkRoutes from './BookMarkRoutes.js';
import FollowRoutes from './FollowRoutes.js';
import Jobroutes from './JobRoutes.js';
const router = Router();

// Setting up routes
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Alumni API' });
}
);
router.use('/api/v1/user', UserRouter);
router.use('/api/v1/blog', BlogRoutes);
router.use('/api/v1/admin', AdminRoutes);
router.use('/api/v1/event', EventRoutes);
router.use('/api/v1/comment', CommentRoutes);
router.use('/api/v1/bookmark', BookMarkRoutes);
router.use('/api/v1/follow', FollowRoutes);
router.use('/api/v1/job', Jobroutes);

export default router;
