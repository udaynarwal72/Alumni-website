import AsyncHandler from '../../utils/AsyncHandle.js';
import ApiError from '../../utils/ApiError.js';
import uploadOnCloudinary from "../../utils/Cloudinary.js";
import ApiResponse from '../../utils/ApiResponse.js';
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;
import User from '../../Schema/UserSchema.js';
const userSignUpController = async (req, res) => {
    // Extract user details from frontend
    const {
        username,
        first_name,
        last_name,
        joining_batch,
        country,
        state,
        city,
        address,
        branch,
        organisation,
        email,
        password,
        phone_number,
        dob,
        profile_picture,
        is_admin,
        verified,
        valid_user,
        blogs,
        comments,
        likes,
        linkedin_profile,
        twitter_handle,
        facebook_profile,
        instagram_handle,
        job_title,
        department,
        work_experience,
        skills,
        time_zone,
        bookmarks,
        hobbies,
        profile_views,
        verification_status,
        terms_accepted,
        certifications,
        awards,
        badges,
    } = req.body;

    if (username === "" && first_name === "" && email == "" && password == "") {
        throw new ApiError(400, "Required fields are empty")
    }

    // const existedUser = await User.findOne({
    //     $or: [{ username }, { email }]
    // })

    // if (existedUser) {
    //     throw new ApiError(409, "User with email or username already exists");
    // }

    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && (req.files.avatar.length > 0)) {
        avatarLocalPath = req.files.avatar[0].path;
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    const user = await User.create({
        username: username.toLowerCase(),
        first_name: first_name,
        last_name: last_name,
        joining_batch: joining_batch,
        country: country,
        state: state,
        city: city,
        address: address,
        branch: branch,
        organisation: organisation,
        email: email,
        password: password,
        phone_number: phone_number,
        dob: dob,
        avatar: avatar?.url || "",
        coverImage: coverImage?.url || "",
    });

    const createdUser = await User.findById(user._id).select("-password")
    if (!createdUser) {
        throw new ApiError(500, "Internal server error while regestring the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered sucessfully")
    )
};

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

const userLogin = AsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password required");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in Successfully"));
});

const logoutUser = AsyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: { refreshToken: undefined }
    }, { new: true });

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
})

const refreshAccessToken = AsyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (incomingRefreshToken) {
        throw new ApiError(401, "unauthrized request");
    }
    try {
        const decodedToken = verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)
        if (incomingRefreshToken) {
            throw new ApiError(401, "unauthorized request");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token in expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        }

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
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
});

const changeCurrentPassword = AsyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old Password");
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })//important command

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Changed succesfully"))
})

const updateAccoutDetails = AsyncHandler(async (req, res) => {
    const { fullName, email } = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required");
    }
    const user = User.findById(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        { new: true }
    ).select("-password")
    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updateUserAvatar = AsyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (avatar.url) {
        throw new ApiError(400, "Error while uploading")
    }
    // const user = await User.findById(req.user?._id);

    // user.avatar = avatar;
    // user.save({ validateModifiedOnly: false })

    //another method
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")
    return res
        .status(200)
        .json(new ApiResponse(200, "Avatar updated succesfully"))
})

const updateUserCoverImage = AsyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image file is missing")
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (coverImage.url) {
        throw new ApiError(400, "Error while uploading")
    }
    // const user = await User.findById(req.user?._id);

    // user.avatar = avatar;
    // user.save({ validateModifiedOnly: false })

    //another method
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        { new: true }
    ).select("-password")
    return res
        .status(200)
        .json(new ApiResponse(200, "Cover Image updated succesfully"))
});

const getUserDetails = AsyncHandler(async (req, res) => {
    // console.log(req.user?.userId)
    // console.log(req.params.userId)
    const user = await User.findById(req.params.userId).select("-password")
    
    if(user){
        console.log('user fetched successfully')
    }
    else{
        console.log('user cannot be fetched')
    }
    return res
        .status(200)
        .json(new ApiResponse(200, user, "User details fetched successfully"))
})

const updateUserEmail = AsyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                email: email
            }
        },
        { new: true }
    ).select("-password")
    return res
        .status(200)
        .json(new ApiResponse(200, user, "Email updated successfully"))
});

const updateUserFirstNameandLast = AsyncHandler(async (req, res) => {
    const { first_name, last_name } = req.body;

    if (!first_name) {
        throw new ApiError(400, "First Name is required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                first_name: first_name,
                last_name: last_name
            }
        },
        { new: true }
    ).select("-password")
    return res
        .status(200)
        .json(new ApiResponse(200, user, "First Name updated successfully"))
})



export { userLogin, logoutUser, userSignUpController, refreshAccessToken, updateAccoutDetails, updateUserAvatar, changeCurrentPassword, getUserDetails, updateUserCoverImage };
