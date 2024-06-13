import User from "../../Schema/UserSchema.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import AsyncHandler from "../../utils/AsyncHandle.js";

const saveUserToken = AsyncHandler(async (req, res) => {
    try {
        const { notification_token } = req.body;
        consoel.log(req.user);
        const user = await User.findById(req.user._id);
        User.notification_token = notification_token;
        await user.save();
        throw new ApiResponse(200, user, "Notification token saved successfully")
    } catch (error) {
        throw new ApiError(500, null, "Internal server error")
    }
})

export {
    saveUserToken
}
