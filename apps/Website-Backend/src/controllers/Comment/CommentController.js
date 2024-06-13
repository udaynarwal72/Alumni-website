import Comment from "../../Schema/CommentSchema";

const createComment = async (req, res) => {
    const { blogId, text } = req.body;
    try {
        const newComment = await Comment.create({
            blog: blogId,
            createdBy: req.user._id,
            text: text,
        });
        return res
            .status(200)
            .json(new ApiResponse(200, newComment, "Comment created successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, null, `Error creating comment: ${error.message}`));
    }
}

const getAllCommentsByBlogId = async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId }).populate('createdBy', 'name');
        return res.status(200).json(new ApiResponse(200, comments, "Comments retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving comments: ${error.message}`));
    }
}

const getAllCommentsByUserId = async (req, res) => {
    try {
        const comments = await Comment.find({ createdBy: req.user._id }).populate('blog', 'title');
        return res.status(200).json(new ApiResponse(200, comments, "Comments retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving comments: ${error.message}`));
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

const updateCommentById = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { text: text },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json(new ApiResponse(404, null, "Comment not found"));
        }

        return res.status(200).json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error updating comment: ${error.message}`));
    }
}

export {
    createComment,
    getAllCommentsByBlogId,
    getAllCommentsByUserId,
    deleteCommentById,
    updateCommentById
};
