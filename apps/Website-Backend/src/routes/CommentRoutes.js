import express from 'express';
import {
    createComment,
    getAllCommentsByBlogId,
    getAllCommentsByUserId,
    deleteCommentById,
    updateCommentById
} from '../controllers/Comment/CommentController.js'; // Adjust the path as necessary
import verifyJWT from '../middlewares/Auth.middleware.js';

const CommentRoutes = express.Router();

// Define routes and attach controller functions
CommentRoutes.post('/comments', createComment);
CommentRoutes.get('/comments/blog/:blogId', getAllCommentsByBlogId);
CommentRoutes.get('/comments/user', getAllCommentsByUserId);
CommentRoutes.delete('/delete/:commentId',verifyJWT, deleteCommentById);
CommentRoutes.put('/comments/:commentId', updateCommentById);
export default CommentRoutes;
