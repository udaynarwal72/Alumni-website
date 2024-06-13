import User from "../../Schema/UserSchema.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import AsyncHandler from "../../utils/AsyncHandle.js";

const getAllNotificationTokens = async () => {
    try {
        const users = await User.find({}, 'notificationToken'); // Only select the notificationToken field
        const notificationTokens = users.map(user => user.notificationToken);
        return notificationTokens;
    } catch (error) {
        console.error('Error fetching notification tokens:', error);
        throw error;
    }
};

const saveUserToken = AsyncHandler(async (req, res) => {
    try {
        const { notification_token } = req.body;
        console.log('req body', req.body)
        console.log('req params', req.params)
        if (!notification_token) {
            throw new ApiError(400, null, "Notification token is required")
        }
        const user = await User.findById(req.params.userId);
        console.log("User", user)
        user.notificationToken = notification_token;
        await user.save({ validateBeforeSave: false });
        res.status(200).json({
            status: 200,
            data: user,
            message: "Notification token saved successfully"
        })
        // throw new ApiResponse(200, user, "Notification token saved successfully")
    } catch (error) {
        throw new ApiError(500, null, "Internal server error")
    }
})

export {
    saveUserToken
}
