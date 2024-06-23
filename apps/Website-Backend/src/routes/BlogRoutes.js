import { Router } from "express";
import { commentOnBlog, createblog, deleteBlogById, deleteCommentById, getAllBlog, getBlogsByAuthor, getCommentsByBlogId, getSingleBlogById, likeBlog, removeLike, searchBlogs, updateBlogById } from "../controllers/Blog/BlogController.js";
import { upload } from "../middlewares/Multer.middleware.js";
import verifyJWT from "../middlewares/Auth.middleware.js";

const BlogRoutes = Router();

// GET /api/v1/blog
BlogRoutes.get("/bulk", getAllBlog);
BlogRoutes.get("/single/:blogId", getSingleBlogById);
BlogRoutes.post("/postblog", verifyJWT, upload.fields([
    { name: 'blogImage', maxCount: 5 }
]), createblog);
BlogRoutes.put("/updateblog/:blogId", verifyJWT, upload.fields([
    { name: 'blogImage', maxCount: 5 }
]), updateBlogById);
BlogRoutes.delete("/deleteblog/:blogId", verifyJWT, deleteBlogById);
BlogRoutes.post("/like/:blogId", verifyJWT, likeBlog);
BlogRoutes.post("/comment/:blogId", verifyJWT, commentOnBlog);
BlogRoutes.get("/comments/:blogId", getCommentsByBlogId);
BlogRoutes.get("/search", searchBlogs);
BlogRoutes.delete('/unlike/:blogId', verifyJWT, removeLike);
BlogRoutes.get("/author/:authorId",getBlogsByAuthor);
BlogRoutes.delete("/comment/:commentId", verifyJWT, deleteCommentById);

export default BlogRoutes;