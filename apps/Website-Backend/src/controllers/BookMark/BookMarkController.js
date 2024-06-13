import BookMark from "../../Schema/BookMarkSchema";
import ApiResponse from "../../utils/ApiResponse";

const createBookmark = async (req, res) => {
    try {
        const { blogId } = req.params;
        const bookmark = await BookMark.create({
            blog: blogId,
            user: req.user._id
        });
        return res.status(200).json(new ApiResponse(200, bookmark, "Bookmark created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error creating bookmark: ${error.message}`));
    }
}

const removeBookmark = async (req, res) => {
    try {
        const { blogId } = req.params;
        const bookmark = await BookMark.findOneAndDelete({ blog: blogId, user: req.user._id });
        if (!bookmark) {
            return res.status(404).json(new ApiResponse(404, null, "Bookmark not found"));
        }
        return res.status(200).json(new ApiResponse(200, bookmark, "Bookmark removed successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error removing bookmark: ${error.message}`));
    }
}

const getAllBookmarkedBlogs = async (req, res) => {
    try {
        const bookmarks = await BookMark.find({ user: req.user._id }).populate('blog');
        return res.status(200).json(new ApiResponse(200, bookmarks, "Bookmarked blogs retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving bookmarks: ${error.message}`));
    }
}

const getAllUsersWhoBookmarkedBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const bookmarks = await BookMark.find({ blog: blogId }).populate('user');
        return res.status(200).json(new ApiResponse(200, bookmarks, "Users who bookmarked the blog retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving users who bookmarked the blog: ${error.message}`));
    }
}

export {
    createBookmark,
    removeBookmark,
    getAllBookmarkedBlogs,
    getAllUsersWhoBookmarkedBlog
}
