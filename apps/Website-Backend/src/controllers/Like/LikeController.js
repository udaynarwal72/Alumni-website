import Liked from "../../Schema/LikeSchema";

const createLike = async (req, res) => {
    try {
        const { blogId } = req.params;
        const like = await Liked.create({
            blog: blogId,
            user: req.user._id,
            blog: blogId
        });
        return res.status(200).json(new ApiResponse(200, like, "Like created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error creating like: ${error.message}`));
    }
}

const removeLike = async (req, res) => {
    try {
        const { blogId } = req.params;
        const like = await Liked.findOneAndDelete({ blog: blogId, user: req.user._id });
        if (!like) {
            return res.status(404).json(new ApiResponse(404, null, "Like not found"));
        }
        return res.status(200).json(new ApiResponse(200, like, "Like removed successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error removing like: ${error.message}`));
    }
}

const getAllLikedBlog = async (req, res) => {
    try {
        const likes = await Liked.find({ user: req.user._id }).populate('blog');
        return res.status(200).json(new ApiResponse(200, likes, "Likes retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving likes: ${error.message}`));
    }
}

const getAllUserWhoLikedBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const likes = await Liked.find({ blog: blogId }).populate('user');
        return res.status(200).json(new ApiResponse(200, likes, "Users who liked the blog retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving users who liked the blog: ${error.message}`));
    }
}

export {
    createLike,
    removeLike,
    getAllLikedBlog,
    getAllUserWhoLikedBlog
}