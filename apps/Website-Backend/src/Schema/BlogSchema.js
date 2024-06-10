const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        requie: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"//model reference
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    image: {
        type: String,
        required: false
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Blog = mongoose.model("BlogSchema", BlogSchema);

module.exports = Blog;