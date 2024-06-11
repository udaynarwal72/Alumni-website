const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    image: { type: String },
    isPublished: { type: Boolean, default: false },
    tags: [{ type: String }],
    categories: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
    target_people: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
