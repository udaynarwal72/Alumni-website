import AsyncHandler from '../../utils/AsyncHandle.js';
import ApiError from '../../utils/ApiError.js';
import uploadOnCloudinary from "../../utils/Cloudinary.js";
import ApiResponse from '../../utils/ApiResponse.js';
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;
import User from '../../Schema/UserSchema.js';
import Liked from '../../Schema/LikeSchema.js';
import BookMark from '../../Schema/BookMarkSchema.js';
import Notification from '../../Schema/NotificationSchema.js';
import nodemailer from 'nodemailer'
import Comment from '../../Schema/CommentSchema.js';
import { Chance } from 'chance';
const chance = Chance();
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

    // const user = await User.create({
    //     username: chance.name().toLowerCase(),
    //     first_name: chance.first(),
    //     last_name: chance.last(),
    //     joining_batch: chance.year(),
    //     country: chance.country(),
    //     state: chance.state(),
    //     city: chance.city(),
    //     address: chance.address(),
    // //     'Computer Science', ', 'Information Technology',
    // // 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Production and Industrial Engineering',
    // // 'Mathematics and Computing', 'Industrial Internet of Things', 'Other'
    //     branch: "Computer Science",
    //     designation: chance.profession({length:1}),
    //     organisation: chance.company({length:1}),
    //     skills: skills,
    //     email: chance.email(),
    //     password: "uday123",
    //     phone_number: chance.phone(),
    //     dob: chance.date(),
    //     avatar: "http://res.cloudinary.com/dttk927pq/image/upload/v1718633857/atpqyd8ciinqbdsgccle.png" || "",
    //     coverImage: "http://res.cloudinary.com/dttk927pq/image/upload/v1718633859/wdzusookus0daswbldum.jpg" || "",
    // });
    const calculated_state = state.split("+")[0].trim();

    const user = await User.create({
        username: username,
        first_name: first_name,
        last_name: last_name,
        joining_batch: joining_batch,
        country: country,
        state: calculated_state,
        city: city,
        address: address,
        branch: branch,
        organisation: organisation,
        skills: skills,
        email: email,
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

const updateRemainingProfile = AsyncHandler(async (req, res) => {

    try {
        const { country, state, city, likedin, instagram, twitter, achievements, hobbies } = req.body;
        const awards = achievements.split(",").map((achievement) => {
            return achievement.trim();
        });
        console.log(awards)
        const user_hobbie = hobbies.split(",").map((hobby) => {
            return hobby.trim();
        });
        console.log(user_hobbie)
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    current_state: state,
                    currnet_country: country,
                    current_city: city,
                    linkedin_profile: likedin,
                    twitter_handle: twitter,
                    instagram_handle: instagram,
                    awards: awards,
                    hobbies: user_hobbie,
                }
            },
        ).select("-password");
        console.log(user)
        return res
            .status(200)
            .json(new ApiResponse(200, user, "Profile updated successfully"));
    } catch (error) {
        throw new ApiError(500, error.message)
    }
});

const updateUserProfile = AsyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const { first_name, last_name, joining_batch, country, state, city, address, branch, organisation, phone_number, dob, linkedin_profile, twitter_handle, facebook_profile, instagram_handle, job_title, department, work_experience, skills, time_zone, hobbies, certifications, awards, badges } = req.body;

        if (!first_name) {
            throw new ApiError(400, "First Name is required");
        }

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    first_name: first_name,
                    last_name: last_name,
                    joining_batch: joining_batch,
                    country: country,
                    state: state,
                    city: city,
                    address: address,
                    branch: branch,
                    organisation: organisation,
                    phone_number: phone_number,
                    dob: dob,
                    linkedin_profile: linkedin_profile,
                    twitter_handle: twitter_handle,
                    facebook_profile: facebook_profile,
                    instagram_handle: instagram_handle,
                    job_title: job_title,
                    department: department,
                    work_experience: work_experience,
                    skills: skills,
                    time_zone: time_zone,
                    hobbies: hobbies,
                    certifications: certifications,
                    awards: awards,
                    badges: badges
                }
            },
            { new: true }
        ).select("-password")
        return res
            .status(200)
            .json(new ApiResponse(200, user, "Profile updated successfully"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

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
            return res.status(200).json(new ApiResponse(200, { isLoggedIn: true }, "User is authenticated"));
        }
        else {
            return res.status(401).json(new ApiResponse(401, { isLoggedIn: false }, "User is not authenticated"));

        }
    }
    else {
        return res.status(401).json(new ApiResponse(401, { isLoggedIn: false }, "User is not authenticated"));
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
