import { Router } from 'express';
import { followUser, deleteFollowUser, getFollowers, getFollowing, deleteFollowing } from '../controllers/follow/followcontroller.js';
import verifyJWT from '../middlewares/Auth.middleware.js';

const FollowRoutes = Router();

// Route to follow a user
FollowRoutes.post('/follow/:userToBeFollowed', verifyJWT, followUser);

// Route to unfollow a user
FollowRoutes.delete('/unfollow/:userToBeUnfollowed', verifyJWT, deleteFollowUser);

// Route to remove a follower
FollowRoutes.delete('/remove-follower/:userToBeUnfollowed', verifyJWT, deleteFollowing);

// Route to get followers of the authenticated user
FollowRoutes.get('/followers', verifyJWT, getFollowers);

// Route to get users the authenticated user is following
FollowRoutes.get('/following', verifyJWT, getFollowing);

export default FollowRoutes;
