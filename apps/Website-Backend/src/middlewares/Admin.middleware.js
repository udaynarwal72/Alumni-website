import ApiError from "../utils/ApiError.js";
// const asyncHandler = require('../../utils/asyncHandler');
import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
import AsyncHandler from "../utils/AsyncHandle.js";
import Alumniadmin from "../Schema/AdminShema.js";

const verifyAdmin = AsyncHandler(async (req, res, next) => {
    try {
        // console.log("user id",req.user._id)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log("token",token);
        if (!token) {
            throw new ApiResponse(401, "Unauthorized request");
        }
        const decodedToken = verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await  Alumniadmin.findById(decodedToken?._id).select("-password -refreshToken");
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

export default verifyAdmin