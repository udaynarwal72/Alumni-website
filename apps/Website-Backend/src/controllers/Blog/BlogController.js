import ApiResponse from '../../utils/ApiResponse.js';
import Blog from '../../Schema/BlogSchema.js';
import uploadOnCloudinary from '../../utils/Cloudinary.js';
import Liked from '../../Schema/LikeSchema.js';
import Comment from '../../Schema/CommentSchema.js';

// Create a blog post
const createblog = async (req, res) => {
    try {
        const { blog_title, blog_body, blog_tags } = req.body;

        let blogImagePath = "";
        if (req.files && Array.isArray(req.files.blogImage) && req.files.blogImage.length > 0) {
            blogImagePath = req.files.blogImage[0].path;
        }

        const uploadImageCloud = await uploadOnCloudinary(blogImagePath);

        const createdBlog = await Blog.create({
            blog_title: blog_title,
            blog_body: blog_body,
            blogImage: uploadImageCloud?.url || "",
            tags: blog_tags,
            blog_createdBy:req.user._id
        });
        return res.status(200).json(new ApiResponse(200, createdBlog, "Blog created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error creating blog: ${error.message}`));
    }
};

// Get all blog posts
const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find();

        return res.status(200).json(new ApiResponse(200, blogs, "Blogs retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving blogs: ${error.message}`));
    }
};

const updateBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { blog_title, blog_body, blog_tags } = req.body;

        let blogImagePath = "";
        if (req.files && Array.isArray(req.files.blogImage) && req.files.blogImage.length > 0) {
            blogImagePath = req.files.blogImage[0].path;
        }

        const uploadImageCloud = await uploadOnCloudinary(blogImagePath);

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            blog_title: blog_title,
            blog_body: blog_body,
            blogImage: uploadImageCloud?.url || "",
            tags: blog_tags,
        });

        return res.status(200).json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error updating blog: ${error.message}`));
    }
}
const deleteBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        return res.status(200).json(new ApiResponse(200, deletedBlog, "Blog deleted successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error deleting blog: ${error.message}`));
    }
}
const getSingleBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findById(blogId);

        return res.status(200).json(new ApiResponse(200, blog, "Blog retrieved successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving blog: ${error.message}`));
    }
};

const likeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await Blog.findById(blogId);
        Liked.create({
            user: req.user._id,
            blog: blogId,
        });
        return res.status(200).json(new ApiResponse(200, blog, "Blog liked successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error liking blog: ${error.message}`));
    }
}

const commentOnBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { text } = req.body;

        const comment = Comment.create({
            text: text,
            blog: blogId,
            createdBy: req.user._id
        });

        return res.status(200).json(new ApiResponse(200, comment, "Comment added successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error adding comment: ${error.message}`));
    }
}
const getCommentsByBlogId = async (req, res) => {
    try {
        const { blogId } = req.params;

        const comments = await Comment.find({ blog: blogId });

        return res.status(200).json(new ApiResponse(200, comments, "Comments retrieved successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving comments: ${error.message}`));
    }
}

const searchBlogs = async (req, res) => {
    try {
        const { search } = req.query;

        const blogs = await Blog.find({ $text: { $search: search } });

        return res.status(200).json(new ApiResponse(200, blogs, "Blogs retrieved successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving blogs: ${error.message}`));
    }
}

const getBlogsByAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;

        const blogs = await Blog.find({ blog_createdBy: authorId });

        return res.status(200).json(new ApiResponse(200, blogs, "Blogs retrieved successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving blogs: ${error.message}`));
    }
}

const getBlogsByTag = async (req, res) => {
    try {
        const { tag } = req.query;
        const blogs = await Blog.find({ tags: tag });
        return res.status(200).json(new ApiResponse(200, blogs, "Blogs retrieved successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving blogs: ${error.message}`));
    }
}

const createBookMark = async (req, res) => {
    try {
        const { blogId } = req.params;

        const bookmark = await BookMark.create({
            user: req.user._id,
            blog: blogId
        });

        return res.status(200).json(new ApiResponse(200, bookmark, "Blog bookmarked successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error bookmarking blog: ${error.message}`));
    }
}

export {
    createblog,
    getAllBlog,
    updateBlogById,
    deleteBlogById,
    getSingleBlogById,
    likeBlog,
    commentOnBlog,
    getCommentsByBlogId,
    searchBlogs,//pending
    getBlogsByAuthor,//pending
    getBlogsByTag,//pending
    createBookMark,//pending
};
