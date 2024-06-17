import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookMarkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'AlumniUser',
        required: true,
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    }
}, { timestamps: true });

const BookMark = model('Bookmark', bookMarkSchema);

export default BookMark;