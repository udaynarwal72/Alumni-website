import { Router } from "express";
import {
    createLike,
    removeLike,
    getAllLikedBlog,
    getAllUserWhoLikedBlog
} from '../controllers/Like/LikeController'; // Adjust the path as necessary
import verifyJWT from "../middlewares/Auth.middleware";

const LikedRoutes = Router();

// Define routes and attach controller functions
LikedRoutes.post('/likes/:blogId', verifyJWT, createLike);
LikedRoutes.delete('/likes/:blogId', verifyJWT, removeLike);
LikedRoutes.get('/likes', getAllLikedBlog);
LikedRoutes.get('/likes/blog/:blogId/users', getAllUserWhoLikedBlog);

export default LikedRoutes;
