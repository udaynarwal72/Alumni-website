import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const blogSchema = new Schema({
    blog_title: { type: String, required: true },
    blog_body: { type: String, required: true },
    blog_createdBy: { type: Schema.Types.ObjectId, ref: 'AlumniUser', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    blogImage: { type: String },
    isPublished: { type: Boolean, default: true },
    blog_tags: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
}, { timestamps: true });

const Blog = model('Blog', blogSchema);

export default Blog;