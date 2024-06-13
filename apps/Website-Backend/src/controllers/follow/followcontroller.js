import Follow from "../../Schema/followerSchema.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import AsyncHandler from "../../utils/AsyncHandle.js";

const followUser = AsyncHandler(async (req, res) => {
    try {
        const { userToBeFollowed } = req.params.userToBeFollowed;

        const response = Follow.create({
            userToBeFollowed: userToBeFollowed,
            user_following: req.user._id,
        });
        throw new ApiResponse(200, response, "Followed Successfully")
    } catch (error) {
        throw new ApiError(500, null, "Internal server error")
    }
});

const deleteFollowUser = AsyncHandler(async (req, res) => {
    try {
        const { userToBeUnfollowed } = req.params.userToBeUnfollowed;
        const response = Follow.deleteOne({
            userToBeFollowed: userToBeUnfollowed,
            user_following: req.user._id,
        });
        throw new ApiResponse(200, response, "User unfollowed Successfully");
    } catch (error) {
        throw new ApiError(500, null, "Internal server error")
    }
})

const deleteFollowing = AsyncHandler(async (req, res) => {
    try {
        const { userToBeUnfollowed } = req.params.userToBeUnfollowed;
        const response = Follow.deleteOne({
            userToBeFollowed: req.user._id,
            user_following: userToBeUnfollowed,
        });
        throw new ApiResponse(200, response, "User unfollowed Successfully");
    } catch (error) {
        throw new ApiError(500, null, "Internal server error")
    }
})

const getFollowers = AsyncHandler(async (req, res) => {
    try {
        const followers = Follow.find({ userToBeFollowed: req.user._id });
        throw new ApiResponse(200, followers, "Followers fetched successfully")
    } catch (error) {
        throw new ApiError(500, null, "Internal server error")
    }
})

const getFollowing = AsyncHandler(async (req, res) => {
    try {
        const following = Follow.find({ user_following: req.user._id });
        throw new ApiResponse(200, following, "Following fetched successfully")
    } catch (error) {
        throw new ApiError(500, null, "Internal server error")
    }
})

export { followUser, deleteFollowUser, getFollowers, getFollowing, deleteFollowing };