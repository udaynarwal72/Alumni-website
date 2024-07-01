import AsyncHandler from '../../utils/AsyncHandle.js';
import ApiError from '../../utils/ApiError.js';
import {uploadOnCloudinary} from "../../utils/Cloudinary.js";
import ApiResponse from '../../utils/ApiResponse.js';
import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
import User from '../../Schema/UserSchema.js';
import Liked from '../../Schema/LikeSchema.js';
import BookMark from '../../Schema/BookMarkSchema.js';
import Notification from '../../Schema/NotificationSchema.js';
import nodemailer from 'nodemailer'
import Comment from '../../Schema/CommentSchema.js';
import { Chance } from 'chance';

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

const userSignUpController = async (req, res) => {
    // Extract user details from frontend
    console.log(req.body)
    const {
        username,
        first_name,
        last_name,
        joining_batch,
        joining_country,
        joining_state,
        joining_city,
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
        designation,
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
        phone_visible,
        badges,
    } = req.body;
    console.log(req.body)
    if (username === "" && first_name === "" && email == "" && password == "") {
        throw new ApiError(400, "Required fields are empty")
    }
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
    const calculated_state = joining_state.split("+")[0].trim();
    const calculated_country = joining_country.split("+")[0].trim();
    const calculated_phone_visible = phone_visible === "on" ? true : false;
    const user = await User.create({
        username: username,
        first_name: first_name,
        last_name: last_name,
        joining_batch: joining_batch,
        joining_country: calculated_country,
        joining_state: calculated_state,
        joining_city: joining_city,
        address: address,
        branch: branch,
        organisation: organisation,
        skills: skills,
        email: email,
        phone_visible: calculated_phone_visible,
        designation: designation,
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

const changeNotloggedInUserPassword = AsyncHandler(async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body
    const user = await User.findById({
        _id: userId
    })
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old Password");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false })
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Changed succesfully"))
})

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
    try {
        console.log(req.user)
        // console.log(`Fetching details for user ID: ${req.user._id}`);
        //6668b7e9cd97529c7052fcdc
        const user = await User.findById(req.user._id).select("-password");

        if (user) {
            console.log('User fetched successfully');
            return res.status(200).json(new ApiResponse(200, user, "User details fetched successfully"));
        } else {
            console.log('User cannot be fetched');
            return res.status(404).json(new ApiResponse(404, null, "User not found"));
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json(new ApiResponse(500, null, "An error occurred while fetching user details"));
    }
});

const updateRemainingProfile = async (req, res) => {
    try {
        const { current_country, current_state, current_city, linkedin, instagram, twitter, achievements, hobbies } = req.body;

        // Split achievements and hobbies into arrays
        const awards = achievements.split(",").map((achievement) => achievement.trim());
        const user_hobbies = hobbies.split(",").map((hobby) => hobby.trim());

        // Create an object to store only the updated fields
        const updates = {};
        const calculated_country = current_country.split("+")[0].trim();
        const calculated_state = current_state.split("+")[0].trim();
        // Populate updates object with fields that have changed
        if (current_state) updates.current_state = calculated_state;
        if (current_country) updates.current_country = calculated_country;
        if (current_city) updates.current_city = current_city;
        if (linkedin) updates.linkedin_profile = linkedin;
        if (twitter) updates.twitter_handle = twitter;
        if (instagram) updates.instagram_handle = instagram;
        if (achievements) updates.awards = awards;
        if (hobbies) updates.hobbies = user_hobbies;

        // Update user only if there are changes
        if (Object.keys(updates).length > 0) {
            const user = await User.findByIdAndUpdate(
                req.user?._id,
                { $set: updates },
                { new: true } // To return the updated document
            ).select("-password");

            return res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
        } else {
            // No fields were updated
            return res.status(200).json(new ApiResponse(200, null, "No changes detected"));
        }
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};

const updateUserProfile = AsyncHandler(async (req, res) => {
    try {
        console.log(req.body);

        const {
            username, first_name, last_name, joining_batch, current_country, current_state, current_city,
            address, branch, organisation, designation, email, phone_number, dob, linkedin_profile,
            instagram_handle, twitter_handle, facebook_profile, hobbies, awards, marriage_anniversary,
            wife_name, children_name, phone_visible
        } = req.body;

        // Determine phone_visible based on checkbox value
        console.log('this is phone visible')
        const calculated_phone_visible = (phone_visible) === "on";

        console.log(calculated_phone_visible);

        // Prepare update fields object
        const updateFields = {
            username: username || "",
            first_name: first_name || "",
            last_name: last_name || "",
            joining_batch: joining_batch || "",
            address: address || "",
            organisation: organisation || "",
            designation: designation || "",
            email: email || "",
            phone_number: phone_number || "",
            dob: dob || "",
            linkedin_profile: linkedin_profile || "",
            instagram_handle: instagram_handle || "",
            twitter_handle: twitter_handle || "",
            facebook_profile: facebook_profile || "",
            hobbies: hobbies ? hobbies.trim().split(',').map(hobby => hobby.trim()) : [],
            awards: awards ? awards.trim().split(',').map(award => award.trim()) : [],
            marriage_anniversary: marriage_anniversary || "",
            wife_name: wife_name || "",
            children_name: children_name ? children_name.trim().split(',').map(child => child.trim()) : []
        };

        // Add phone_visible to updateFields if true
        if (calculated_phone_visible) {
            updateFields.phone_visible = true;
        }else{
            updateFields.phone_visible = false;
        }

        // Add branch, current_country, and current_state if available
        if (branch) {
            updateFields.branch = branch;
        }
        if (current_country) {
            updateFields.current_country = current_country.split('+')[0].trim();
        }
        if (current_state) {
            updateFields.current_state = current_state.split('+')[0].trim();
        }
        
        // Handle file uploads (avatar and coverImage)
        let avatar, coverImage;
        if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
            const avatarLocalPath = req.files.avatar[0].path;
            avatar = await uploadOnCloudinary(avatarLocalPath);
            updateFields.avatar = avatar?.url || "";
        }
        if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
            const coverImageLocalPath = req.files.coverImage[0].path;
            coverImage = await uploadOnCloudinary(coverImageLocalPath);
            updateFields.coverImage = coverImage?.url || "";
        }

        // Update user profile in the database
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updateFields },
            { new: true }
        ).select("-password");

        // Check if user exists and return response
        if (!user) {
            return res.status(404).json(new ApiResponse(404, null, "User not found"));
        }

        // Return success response with updated user data
        return res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});





const getUserlikedPost = AsyncHandler(async (req, res) => {
    try {
        const LikedBlog = Liked.find({
            user: req.user._id
        });
        return res.status(200).json(new ApiResponse(200, LikedBlog, "Liked Post fetched successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }

})

const getUserComments = AsyncHandler(async (req, res) => {
    try {
        const comments = Comment.find({
            createdBy: req.user._id
        })
        return res.status(200).json(new ApiResponse(200, comments, "Comments fetched successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
});

const getUserBookMark = AsyncHandler(async (req, res) => {
    try {
        const bookmarks = BookMark.find({
            user: req.user._id
        })
        return res.status(200).json(new ApiResponse(200, bookmarks, "Bookmarks fetched successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

const deleteUserProfile = AsyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        return res.status(200).json(new ApiResponse(200, user, "User deleted successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

const getUserNotifications = (req, res) => {
    try {
        Notification.find({
            user: req.user._id
        })
    } catch (error) {

    }
}

const changeCurrentEmail = (req, res) => {
    try {
        const ChangedEmail = User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    email: req.body.email
                }
            },
            { new: true }
        ).select("-password")
        return res.status(200).json(new ApiResponse(200, ChangedEmail, "Email changed successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
}

const findNotificationById = (req, res) => {
    try {
        const notification = Notification.findById(req.params.notificationId)
        return res.status(200).json(new ApiResponse(200, notification, "Notification fetched successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
}

const deleteNotification = (req, res) => {
    try {
        Notification.findByIdAndDelete(req.params.notificationId)
        return res.status(200).json(new ApiResponse(200, {}, "Notification deleted successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
}

const sendUserEmail = async (req, res) => {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: process.env.ADMIN_MAIL,
            pass: process.env.ADMIN_PASSWORD,
        }
    });;
    const parentuser = await User.find();

    for (const user of parentuser) {
        if (user.pushemail == true) {
            let mailOptions = await transporter.sendMail({
                from: {
                    name: "Uday",
                    address: process.env.ADMIN_MAIL
                }, // sender address
                to: user.email, // list of receivers
                subject: "Welcome, to mathongo", // Subject line
                text: `Hello, ${user.name}`,     // plain text body
                html: ` Hello, ${user.name} Thankyou for signing up with your email ${user.email}. We have received your city as ${user.city}<br> Team Mathongo <a href="https://mathongoproject.vercel.app/unsubscribe/${user._id}">Unsubscribe</a>`, // html body
            });
        }
    }
    res.send("All email sent successfully");
}

const userForgotPasssword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({
            email: email
        })
        if (!user) {
            throw new ApiError(404, "User not found")
        }
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.ADMIN_MAIL,
                pass: process.env.ADMIN_PASSWORD,
            }
        });;

        let mailOptions = await transporter.sendMail({
            from: {
                name: "Uday",
                address: process.env.ADMIN_MAIL
            }, // sender address
            to: user.email, // list of receivers
            subject: "Change your password", // Subject line
            text: `Hello, ${user.name}`,     // plain text body
            html: ` Hello, ${user.name} Link to change your password ${user.email}.<a href="http://localhost:3000/api/v1/profile/settings/change-password">Change Password</a>`, // html body
        });
        // const token = user.pre();
        await user.save({ validateBeforeSave: false })
        return res.status(200).json(new ApiResponse(200, user, "Password reset token generated successfully"))
    }
    catch (error) {
        throw new ApiError(500, error.message)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
}

const checkAuthentication = AsyncHandler(async (req, res) => {
    if (req.user?._id) {
        const user = await User.findById(req.user._id).select("-password");
        if (user) {
            return res.status(200).json(new ApiResponse(200, user, { isLoggedIn: true }, "User is authenticated"));
        }
        else {
            return res.status(401).json(new ApiResponse(401, { isLoggedIn: false }, "User is not authenticated"));

        }
    }
    else {
        return res.status(401).json(new ApiResponse(401, null, { isLoggedIn: false }, "User is not authenticated"));
    }
})

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user) {
            return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
        }
        else {
            return res.status(404).json(new ApiResponse(404, null, "User not found"));
        }
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "An error occurred while fetching user"));
    }
}

export {
    userLogin,
    logoutUser,
    getUserComments,
    userSignUpController,
    getUserlikedPost,
    refreshAccessToken,
    updateUserProfile,
    updateUserAvatar,
    changeCurrentPassword,
    getUserDetails,
    updateUserCoverImage,
    deleteUserProfile,
    getUserNotifications,
    changeCurrentEmail,
    getUserBookMark,
    findNotificationById,
    deleteNotification,
    userForgotPasssword,
    changeNotloggedInUserPassword,
    getAllUsers,
    checkAuthentication,
    getUserById,
    updateRemainingProfile,
};
