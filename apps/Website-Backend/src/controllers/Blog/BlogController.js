import ApiResponse from '../../utils/ApiResponse.js';
import Blog from '../../Schema/BlogSchema.js';
import uploadOnCloudinary from '../../utils/Cloudinary.js';
import Liked from '../../Schema/LikeSchema.js';
import Comment from '../../Schema/CommentSchema.js';
import Chance from 'chance';
import ApiError from '../../utils/ApiError.js';
const chance = new Chance();

// Create a blog post
const createblog = async (req, res) => {
    try {
        const { blog_title, blog_body, tags, blogImage } = req.body;
        req.user.username
        // Handle blog image upload to Cloudinary
        let blogImagePath = "";
        if (req.files && Array.isArray(req.files.blogImage) && req.files.blogImage.length > 0) {
            blogImagePath = req.files.blogImage[0].path;
        }
        const uploadImageCloud = await uploadOnCloudinary(blogImagePath);

        // Process tags: convert to lowercase and split into array
        const tagArray = tags.trim().toLowerCase().split(' ');

        // Create the blog entry in the database
        const createdBlog = await Blog.create({
            blog_title: blog_title,
            blog_body: blog_body,
            blogImage: uploadImageCloud?.url || "",
            blog_tags: tagArray,
            blog_createdBy: req.user._id // Assuming req.user contains creator information

        });

        // Return success response with created blog data
        return res.status(200).json({
            status: 200,
            data: createdBlog,
            message: "Blog created successfully"
        });
    } catch (error) {
        // Handle any errors that occur during blog creation
        return res.status(500).json({
            status: 500,
            data: null,
            message: `Error creating blog: ${error.message}`
        });
    }
};

// Get all blog posts
const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('blog_createdBy', 'username avatar');
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
        console.log("blogId", blogId);

        // Find the blog by ID and populate the fields
        const blog = await Blog.findById(blogId)
            .populate('blog_createdBy', 'username avatar')
            .populate({
                path: 'comments',
                select: 'text createdBy createdAt',
                populate: {
                    path: 'createdBy',
                    select: 'username avatar'
                }
            })
            .populate('likes', 'user');
        // Check if the blog exists
        if (!blog) {
            return res.status(404).json(new ApiResponse(404, null, "Blog not found"));
        }

        // Return the blog details in the response
        return res.status(200).json(new ApiResponse(200, blog, "Blog retrieved successfully"));
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving blog: ${error.message}`));
    }
};
const likeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        // Check if the user has already liked the blog
        const existingLike = await Liked.findOne({
            user: userId,
            blog: blogId,
        });

        if (existingLike) {
            return res.status(400).json(new ApiResponse(400, null, "User has already liked this blog"));
        }

        // Create a new like entry
        const liked = await Liked.create({
            user: userId,
            blog: blogId,
        });

        // Update the blog with the new like
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            { $push: { likes: liked._id } },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json(new ApiResponse(404, null, "Blog not found"));
        }

        return res.status(200).json(new ApiResponse(200, liked, "Blog liked successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error liking blog: ${error.message}`));
    }
};



const commentOnBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { user_response } = req.body;

        // Ensure req.user is defined
        if (!req.user || !req.user._id) {
            return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));
        }

        // Await comment creation
        const comment = await Comment.create({
            text: user_response,
            blog: blogId,
            createdBy: req.user._id
        });
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: {
                comments: comment._id
            }
        });

        return res.status(200).json(new ApiResponse(200, comment, "Comment added successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, null, `Error adding comment: ${error.message}`));
    }
};

const removeLike = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user._id;

        const like = await Liked.findOneAndDelete({ blog: blogId, user: userId });

        if (!like) {
            return res.status(404).json(new ApiResponse(404, null, "Like not found"));
        }

        const blog = await Blog.findByIdAndUpdate(
            blogId,
            { $pull: { likes: like._id } },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json(new ApiResponse(404, null, "Blog not found"));
        }

        return res.status(200).json(new ApiResponse(200, like, "Like removed successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error removing like: ${error.message}`));
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

        const blogs = await Blog.find({ blog_createdBy: authorId }).populate('blog_createdBy','username avatar');

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

const deleteCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json(new ApiResponse(404, null, "Comment not found"));
        }
        return res.status(200).json(new ApiResponse(200, deletedComment, "Comment deleted successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error deleting comment: ${error.message}`));
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
    deleteCommentById,
    removeLike,
};