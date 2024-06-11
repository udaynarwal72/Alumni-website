const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
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
    blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    linkedin_profile: { type: String },
    twitter_handle: { type: String },
    facebook_profile: { type: String },
    instagram_handle: { type: String },
    job_title: { type: String },
    department: { type: String },
    work_experience: { type: String },
    skills: [{ type: String }],
    time_zone: { type: String },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    hobbies: [{ type: String }],
    profile_views: { type: Number, default: 0 },
    verification_status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    terms_accepted: { type: Boolean, default: false },
    certifications: [{ type: String }],
    awards: [{ type: String }],
    badges: [{ type: String }]
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return
    this.password = bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateExcessToken = function (token) {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.generateExcessToken = function (token) {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken = function (token) {
    return
}

// Export the model
const User = mongoose.model('User', UserSchema);
module.exports = User;
