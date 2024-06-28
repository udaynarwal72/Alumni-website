import { Schema as _Schema, model } from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken;
import { genSalt, hash, compare } from 'bcrypt';
import dotenv from 'dotenv';   
const Schema = _Schema;
                          
const AdminSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

AdminSchema.pre("save", async function (next) {
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
AdminSchema.methods.isPasswordCorrect = async function (password) {
    const isMatch = await compare(password, this.password);
    return isMatch;
};

AdminSchema.methods.generateAccessToken = function () {
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


AdminSchema.methods.generateRefreshToken = function () {
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
                   
const Alumniadmin = model('Admin', AdminSchema);
                         
export default Alumniadmin;