import { Router } from 'express';
import { createBookmark, removeBookmark, getAllBookmarkedBlogs, getAllUsersWhoBookmarkedBlog } from '../controllers/Blog/BlogController';
import verifyJWT from '../middlewares/Auth.middleware';

const BookMarkRoutes = Router();

// Route to create a bookmark
BookMarkRoutes.post('/bookmark/:blogId', verifyJWT, createBookmark);
BookMarkRoutes.delete('/bookmark/:blogId', verifyJWT, removeBookmark);
BookMarkRoutes.get('/bookmarks', verifyJWT, getAllBookmarkedBlogs);
BookMarkRoutes.get('/bookmarks/:blogId/users', verifyJWT, getAllUsersWhoBookmarkedBlog);

export default BookMarkRoutes;