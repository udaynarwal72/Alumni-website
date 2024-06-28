import Alumniadmin from "../../Schema/AdminShema.js";
import AsyncHandler from '../../utils/AsyncHandle.js';
const { verify } = 'jsonwebtoken'; // Ensure to import 'verify' from 'jsonwebtoken'
import ApiError from '../../utils/ApiError.js'; // Import ApiError
import ApiResponse from '../../utils/ApiResponse.js'; // Import ApiResponse

const refreshAccessToken = AsyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }
    try {
        const decodedToken = verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        const user = await Alumniadmin.findById(decodedToken?._id);
        if (!user || incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed",
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await Alumniadmin.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

const Adminsignup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Alumniadmin.create({
            username: username,
            password: password,
        });
        res.status(200).json({ user: user, message: "Admin created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Admin not created", error: error });
    }
};

const Adminsignin = AsyncHandler(async (req, res, next) => {
    console.log("this is body",req.body)
    const { username, password } = req.body;
    if (!username || !password) {
        throw new ApiError(400, "username and password required");
    }
    const user = await Alumniadmin.findOne({ username });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User credentials");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await Alumniadmin.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

const Admindelete = AsyncHandler(async (req, res) => {
    const { adminId } = req.params;
    const user = await Alumniadmin.findByIdAndDelete(adminId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json({ message: "User deleted successfully" });
});

export {
    Adminsignup,
    Adminsignin,
    Admindelete
};
