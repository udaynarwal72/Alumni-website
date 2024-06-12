import { Router } from 'express';
import UserRouter from './UserRoutes.js';
import BlogRoutes from './BlogRoutes.js';
import AdminRoutes from './AdminRoutes.js';
const router = Router();

// Setting up routes
router.use('/api/v1/user', UserRouter);
router.use('/api/v1/blog', BlogRoutes);
router.use('/api/v1/admin', AdminRoutes);

export default router;
