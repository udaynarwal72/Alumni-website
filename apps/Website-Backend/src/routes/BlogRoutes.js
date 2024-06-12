import { Router } from 'express';
import { createBlog, blogDelete } from '../controllers/Blog/BlogController.js';

const BlogRoutes = Router();

BlogRoutes.get('/bulk')
BlogRoutes.post('/',createBlog);
BlogRoutes.delete('/:blogId',blogDelete)
BlogRoutes.put('/:blogId',)

export default BlogRoutes;