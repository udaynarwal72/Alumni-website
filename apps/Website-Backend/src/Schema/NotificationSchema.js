import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

export default model('Notification', notificationSchema);
