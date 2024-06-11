const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    joining_batch: {
        type: Number,
        default: new Date().getFullYear(),
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    organisation: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    phone_number: {
        type: Number,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    profile_picture: {
        type: String,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    valid_user: {
        type: Boolean,
        default: false,
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog',
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    // likes: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Like',
    // }],
    // dislikes: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Dislike',
    // }],
    // notifications: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Notification',
    // }],
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
