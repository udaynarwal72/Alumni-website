const express = require('express');
const UserRouter = require('./UserRoutes');
const BlogRoutes = require('./BlogRoutes');
const AdminRoutes = require('./AdminRoutes');
const upload = require('../middlewares/Multer.middleware.js')
const router = express.Router();

// Setting up routes
router.use('/api/v1/user', UserRouter);
router.use('/api/v1/blog', BlogRoutes);
router.use('/api/v1/admin', AdminRoutes);

module.exports = router;
