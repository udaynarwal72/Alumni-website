const express = require('express');
const userSignUpController = require('../controllers/User/SignupController');
const userLogin = require('../controllers/User/LoginController');
const upload = require('../middlewares/Multer.middleware');

const UserRouter = express.Router();

UserRouter.post('/signup', upload.fields([
    {
        name: 'avatar',
        maxCount: 1
    },
    {
        name:'coverImage',
        maxCount:1
    }
]), userSignUpController); // Fixed typo from 'singup' to 'signup'
UserRouter.post('/login', userLogin);
UserRouter.put('/profile/:userId', /* your controller here */);
UserRouter.get('/profile/:userID', /* your controller here */);
UserRouter.get('/profile/:userID/likes', /* your controller here */);
UserRouter.get('/profile/:userID/comments', /* your controller here */);
UserRouter.get('/profile/:userID/bookmarks', /* your controller here */);
UserRouter.put('/profile/:userID/settings/change-password', /* your controller here */);
UserRouter.put('/profile/:userID/settings/change-email', /* your controller here */);
UserRouter.delete('/profile/:userID/delete', /* your controller here */);
UserRouter.get('/profile/:userID/notifications', /* your controller here */);
UserRouter.get('/profile/:userID/notifications/:notificationID', /* your controller here */);
UserRouter.delete('/profile/:userID/notifications/:notificationID', /* your controller here */);

module.exports = UserRouter;
