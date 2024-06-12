import ApiError from "../utils/ApiError.js";
// const asyncHandler = require('../../utils/asyncHandler');
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;
import AsyncHandler from "../utils/AsyncHandle.js";
import User from "../Schema/UserSchema.js";


const verifyJWT = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiResponse(401, "Unauthorized request");
        }
        const decodedToken = verify(token, process.env.ACCESS_TOKEN_SECRET)
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

export default verifyJWT