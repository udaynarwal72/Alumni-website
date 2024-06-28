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
    joining_batch: { type: String, default: '' },
    joining_country: { type: String, default: '' },
    joining_country: { type: String, default: '' },
    joining_country: { type: String, default: '' },
    current_country: { type: String, default: '' },
    current_state: { type: String, default: '' },
    current_city: { type: String, default: '' },
    address: { type: String },
    branch: { type: String },
    organisation: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String },
    dob: { type: Date },
    marriage_anniversary: { type: Date },
    profile_picture: { type: String },
    is_admin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    valid_user: { type: Boolean, default: true },
    linkedin_profile: { type: String, default: "" },
    twitter_handle: { type: String, default: "" },
    facebook_profile: { type: String, default: "" },
    instagram_handle: { type: String, default: "" },
    designation: { type: String },
    hobbies: [{ type: String }],
    profile_views: { type: Number, default: 0 },
    verification_status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    terms_accepted: { type: Boolean, default: false },
    certifications: [{ type: String }],
    awards: [{ type: String }],
    badges: [{ type: String }],
    refreshToken: { type: String, },
    notificationToken: { type: String, default: "" },
    children_name: [{ type: String, default: "" }],
    wife_name: { type: String, default: "" },
    phone_visible: { type: Boolean, default: true }
}, { timestamps: true });

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

UserSchema.methods.generateAccessToken = function () {
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
const User = mongoose.model('Alumni', UserSchema);
export default User;
