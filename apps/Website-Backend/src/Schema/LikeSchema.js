import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const likeSchema = new Schema({
    count: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default model('Like', likeSchema);
