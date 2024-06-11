const ApiError = require("../utils/ApiError");
// const asyncHandler = require('../../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const User = require('../Schema/UserSchema');
const AsyncHandler = require("../utils/AsyncHandle");


const verifyJWT = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiResponse(401, "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    //Authorizatoin: Bearer <token>
})

module.exports = verifyJWT