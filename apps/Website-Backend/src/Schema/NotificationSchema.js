import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const notificationSchema = new Schema({
    type: { type: String, enum: ['new_blog', 'new_comment', 'new_like', 'new_event', 'other'], required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'AlumniUser', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User' }, // optional, the user who triggered the notification
    blog: { type: Schema.Types.ObjectId, ref: 'Blog' }, // optional, related blog
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' }, // optional, related comment
    message: { type: String, required: true },
    read: { type: Boolean, default: false }
}, { timestamps: true });

const Notification = model('Notification', notificationSchema);

export default Notification;
