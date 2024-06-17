import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const likeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'AlumniUser', required: true },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true }
}, { timestamps: true });

// Creating a unique index to prevent duplicate likes by the same user on the same blog
likeSchema.index({ user: 1, blog: 1 }, { unique: true });

const Liked =  model('Like', likeSchema);

export default Liked;