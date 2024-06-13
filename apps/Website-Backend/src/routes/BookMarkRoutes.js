import { Router } from 'express';
import verifyJWT from '../middlewares/Auth.middleware.js';
import { createBookMark } from '../controllers/Blog/BlogController.js';
import { getAllBookmarkedBlogs, getAllUsersWhoBookmarkedBlog, removeBookmark } from '../controllers/BookMark/BookMarkController.js';

const BookMarkRoutes = Router();

// Route to create a bookmark
BookMarkRoutes.post('/bookmark/:blogId', verifyJWT, createBookMark);
BookMarkRoutes.delete('/bookmark/:blogId', verifyJWT, removeBookmark);
BookMarkRoutes.get('/bookmarks', verifyJWT, getAllBookmarkedBlogs);
BookMarkRoutes.get('/bookmarks/:blogId/users', verifyJWT, getAllUsersWhoBookmarkedBlog);

export default BookMarkRoutes;