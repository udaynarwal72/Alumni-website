import Alumniadmin from "../../Schema/AdminShema.js";
import AsyncHandler from '../../utils/AsyncHandle.js';
const { verify } = 'jsonwebtoken'; // Ensure to import 'verify' from 'jsonwebtoken'
import ApiError from '../../utils/ApiError.js'; // Import ApiError
import ApiResponse from '../../utils/ApiResponse.js'; // Import ApiResponse
import User from "../../Schema/UserSchema.js";
import Blog from "../../Schema/BlogSchema.js";
import JobData from "../../Schema/JobSchema.js";
import Event from "../../Schema/EventSchema.js";
import {uploadOnCloudinary, deleteImageFromCloudinary } from "../../utils/Cloudinary.js";
import HeroSection from "../../Schema/HeroSectionSchema.js";

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
    console.log("this is body", req.body)
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

const deleteUserProfileByAdmin = AsyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId)
        const blog = await Blog.deleteMany({ blog_createdBy: userId })
        const jobPost = await JobData.deleteMany({ job_postedBy: userId })
        const eventPost = await Event.deleteMany({ posted_by: userId })
        return res.status(200).json(new ApiResponse(200, user, blog, jobPost, eventPost, "User deleted successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

const deleteBlogByAdmin = async (req, res) => {
    try {
        const { blogId } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        return res.status(200).json(new ApiResponse(200, deletedBlog, "Blog deleted successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error deleting blog: ${error.message}`));
    }
}

const deleteEventByAdmin = async (req, res) => {
    try {
        const { eventId } = req.params;

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        return res.status(200).json(new ApiResponse(200, deletedEvent, "Event deleted successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error deleting event: ${error.message}`));
    }
}

const deleteJobByAdmin = async (req, res) => {
    try {
        const { jobId } = req.params;

        const deletedJob = await JobData.findByIdAndDelete(jobId);

        return res.status(200).json(new ApiResponse(200, deletedJob, "Job deleted successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error deleting job: ${error.message}`));
    }
}

const allowUserByAdmin = async (req, res) => {

    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(
            userId,
            { verification_status: "verified" },
            { new: true }
        );
        return res.status(200).json(new ApiResponse(200, user, "User verified successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error verifying user: ${error.message}`));
    }
}
const pushUserToWaitingRoomByAdmin = async (req, res) => {

    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(
            userId,
            { verification_status: "pending" },
            { new: true }
        );
        return res.status(200).json(new ApiResponse(200, user, "User verified successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error verifying user: ${error.message}`));
    }
}

const addImageToHeroSection = async (req, res) => {
    try {
        console.log(req.files);
        let coverImageLocalPath;
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
            coverImageLocalPath = req.files.coverImage[0].path;
        } else {
            return res.status(400).json(new ApiResponse(400, null, "Cover image is required"));
        }

        const coverImage = await uploadOnCloudinary(coverImageLocalPath);

        const imageCreated = await HeroSection.create({
            coverImage: coverImage?.url,
            createdBy: req.user._id,
            isPublished: true,
        });
        return res.status(200).json(new ApiResponse(200, imageCreated, "Photo added successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error adding photo: ${error.message}`));
    }
};


const removeImageFromHeroSection = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await HeroSection.findById(id);

        if (!image) {
            return res.status(404).json(new ApiError(404, 'Image not found'));
        }

        console.log("coverImage url:", image.coverImage);

        // Await the deleteImageFromCloudinary function
        const removedImageFromCloudinary = await deleteImageFromCloudinary(image.coverImage);

        // Remove the image from the database
        const removedImage = await HeroSection.findByIdAndDelete(id);

        return res.status(200).json(new ApiResponse(200, removedImageFromCloudinary, removedImage, "Image removed successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Error removing image'));
    }
};


const getAllImageOfHeroSection = async (req, res) => {
    try {
        const images = await HeroSection.find().populate('createdBy', 'username');
        return res.status(200).json(new ApiResponse(200, images, "Images fetched successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Error fetching Images'));
    }
}


export {
    Adminsignup,
    Adminsignin,
    Admindelete,
    deleteUserProfileByAdmin,
    deleteBlogByAdmin,
    deleteEventByAdmin,
    deleteJobByAdmin,
    refreshAccessToken,
    allowUserByAdmin,
    pushUserToWaitingRoomByAdmin,
    addImageToHeroSection,
    removeImageFromHeroSection,
    getAllImageOfHeroSection
};