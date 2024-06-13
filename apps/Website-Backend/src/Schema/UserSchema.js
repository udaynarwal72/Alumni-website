import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;
import { genSalt, hash, compare } from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    avatar: { type: String, required: false },
    coverImage: { type: String, required: false },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    joining_batch: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    address: { type: String },
    branch: { type: String },
    organisation: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String },
    dob: { type: Date },
    profile_picture: { type: String },
    is_admin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    valid_user: { type: Boolean, default: true },
    linkedin_profile: { type: String },
    twitter_handle: { type: String },
    facebook_profile: { type: String },
    instagram_handle: { type: String },
    job_title: { type: String },
    department: { type: String },
    work_experience: { type: String },
    skills: [{ type: String }],
    time_zone: { type: String },
    hobbies: [{ type: String }],
    profile_views: { type: Number, default: 0 },
    verification_status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    terms_accepted: { type: Boolean, default: false },
    certifications: [{ type: String }],
    awards: [{ type: String }],
    badges: [{ type: String }],
    refreshToken: { type: String,},
    notificationToken:{type:String,default:""},
}, { timestamps: true });

// Pre-save hook to hash the password before saving the user
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare the password
UserSchema.methods.isPasswordCorrect = async function (password) {
    const isMatch = await compare(password, this.password);
    return isMatch;
};

// Method to generate access token
UserSchema.methods.generateAccessToken = function () {
    console.log('hi')
    return sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

// Method to generate refresh token
UserSchema.methods.generateRefreshToken = function () {
    return sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

// Export the model
const User = mongoose.model('Useryes', UserSchema);
export default User;
