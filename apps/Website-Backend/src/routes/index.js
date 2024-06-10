const express = require('express')
const UserRouter = require('./UserRoutes')
const BlogRoutes = require('./BlogRoutes')
const AdminRoutes = require('./AdminRoutes')

const router = express.Router();

//making routes
router.use('/api/v1/user', UserRouter);
router.use('/api/v1/blog', BlogRoutes);
router.use('api/v1/admin', AdminRoutes);


module.exports = router;
