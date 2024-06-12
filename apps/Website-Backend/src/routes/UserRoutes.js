import { Router } from 'express';
// import { fields } from '../middlewares/Multer.middleware.js';
import verifyJWT from '../middlewares/Auth.middleware.js';
import { userSignUpController, userLogin, refreshAccessToken ,logoutUser, getUserDetails} from '../controllers/User/UserController.js';
import { upload } from '../middlewares/Multer.middleware.js';

const UserRouter = Router();

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
UserRouter.get('/profile/:userId',getUserDetails);
UserRouter.put('/profile/:userId', (req, res) => res.send('Update profile'));
UserRouter.get('/profile/:userId/likes', (req, res) => res.send('Get likes'));
UserRouter.get('/profile/:userId/comments', (req, res) => res.send('Get comments'));
UserRouter.get('/profile/:userId/bookmarks', (req, res) => res.send('Get bookmarks'));
UserRouter.put('/profile/:userId/settings/change-password', (req, res) => res.send('Change password'));
UserRouter.put('/profile/:userId/settings/change-email', (req, res) => res.send('Change email'));
UserRouter.delete('/profile/:userId/delete', (req, res) => res.send('Delete profile'));
UserRouter.get('/profile/:userId/notifications', (req, res) => res.send('Get notifications'));
UserRouter.get('/profile/:userId/notifications/:notificationId', (req, res) => res.send('Get notification'));
UserRouter.delete('/profile/:userId/notifications/:notificationId', (req, res) => res.send('Delete notification'));

export default UserRouter;
