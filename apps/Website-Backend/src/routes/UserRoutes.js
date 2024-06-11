const express = require('express');
const upload = require('../middlewares/Multer.middleware');
const verifyJWT = require('../middlewares/Auth.middleware');
const { userSignUpController, userLogin, logoutUser, refreshAccessToken } = require('../controllers/User/UserController');

const UserRouter = express.Router();

// Check all required imports
// console.log({
//     userSignUpController: typeof userSignUpController,
//     userLogin: typeof userLogin,
//     logoutUser: typeof logoutUser,
//     upload: typeof upload,
//     verifyJWT: typeof verifyJWT
// });

// Route handlers
UserRouter.post('/signup', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
]), userSignUpController); // Ensure this is defined

UserRouter.post('/login', userLogin); // Ensure this is defined

// Secured routes
UserRouter.post('/logout', verifyJWT, logoutUser); // Ensure verifyJWT and logoutUser are defined
UserRouter.post('/refresh-token').post(refreshAccessToken);
// Other routes with placeholders for controllers
UserRouter.put('/profile/:userId', (req, res) => res.send('Update profile'));
UserRouter.get('/profile/:userId', (req, res) => res.send('Get profile'));
UserRouter.get('/profile/:userId/likes', (req, res) => res.send('Get likes'));
UserRouter.get('/profile/:userId/comments', (req, res) => res.send('Get comments'));
UserRouter.get('/profile/:userId/bookmarks', (req, res) => res.send('Get bookmarks'));
UserRouter.put('/profile/:userId/settings/change-password', (req, res) => res.send('Change password'));
UserRouter.put('/profile/:userId/settings/change-email', (req, res) => res.send('Change email'));
UserRouter.delete('/profile/:userId/delete', (req, res) => res.send('Delete profile'));
UserRouter.get('/profile/:userId/notifications', (req, res) => res.send('Get notifications'));
UserRouter.get('/profile/:userId/notifications/:notificationId', (req, res) => res.send('Get notification'));
UserRouter.delete('/profile/:userId/notifications/:notificationId', (req, res) => res.send('Delete notification'));

module.exports = UserRouter;
