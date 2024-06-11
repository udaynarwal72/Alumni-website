const express = require('express');
const ApiError = require('../../utils/ApiError.js');
const { fields } = require('../../middlewares/Multer.middleware.js');
const mongoose = require('mongoose');
const User = require('../../Schema/UserSchema.js');
const uploadOnCloudinary = require("../../utils/Cloudinary.js");
const ApiResponse = require('../../utils/ApiResponse.js');
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

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        first_name: first_name,
        last_name:last_name,
        joining_batch:joining_batch,
        country:country,
        state:state,
        city:city,
        address:address,
        branch:branch,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })
    const createdUser = await User.findById(user._id).select("-password")
    if (!createdUser) {
        throw new ApiError(500, "Internal server error while regestring the user");
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered sucessfully")
    )

};

module.exports = userSignUpController;
