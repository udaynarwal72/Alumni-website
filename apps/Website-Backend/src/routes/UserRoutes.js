import { Router } from 'express';
// import { fields } from '../middlewares/Multer.middleware.js';
import verifyJWT from '../middlewares/Auth.middleware.js';
import { userSignUpController, userLogin, refreshAccessToken, logoutUser, getUserDetails, updateUserProfile, getUserlikedPost, getUserComments, changeCurrentPassword, deleteUserProfile, getUserBookMark, getUserNotifications, findNotificationById, deleteNotification, userForgotPasssword, changeNotloggedInUserPassword, getAllUsers, checkAuthentication, getUserById, updateRemainingProfile } from '../controllers/User/UserController.js';
import { upload } from '../middlewares/Multer.middleware.js';
import { saveUserToken } from '../controllers/User/UserNotification.js';
import User from '../Schema/UserSchema.js';

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
UserRouter.get('/logout', verifyJWT, logoutUser); // Ensure verifyJWT and logoutUser are defined
UserRouter.post('/refresh-token').post(refreshAccessToken);
// Other routes with placeholders for controllers
UserRouter.get('/getuserbyid/:userId', getUserById);
UserRouter.get('/profilesection', verifyJWT, getUserDetails);
UserRouter.get('/check-auth', verifyJWT, checkAuthentication);
UserRouter.get('/findalumni', getAllUsers)
UserRouter.put('/profile/:userId', verifyJWT, updateUserProfile);
UserRouter.put('/updateprofile/:userId', verifyJWT, updateRemainingProfile);
UserRouter.post('/forgot-password', verifyJWT, userForgotPasssword);
UserRouter.get('/profile/:userId/likedPost', verifyJWT, getUserlikedPost);
UserRouter.get('/profile/:userId/comments', verifyJWT, getUserComments);
UserRouter.get('/profile/:userId/bookmarks', verifyJWT, getUserBookMark);
UserRouter.put('/profile/settings/:userID/change-password', changeNotloggedInUserPassword);
UserRouter.put('/profile/change-password', verifyJWT, changeCurrentPassword);
UserRouter.delete('/profile/:userId/delete', verifyJWT, deleteUserProfile);
UserRouter.get('/profile/:userId/notifications', verifyJWT, getUserNotifications);
UserRouter.get('/profile/:userId/notifications/:notificationId', verifyJWT, findNotificationById);
UserRouter.delete('/profile/:userId/notifications/:notificationId', verifyJWT, deleteNotification);
UserRouter.post('/save-notification-token/:userId', saveUserToken);
export default UserRouter;
