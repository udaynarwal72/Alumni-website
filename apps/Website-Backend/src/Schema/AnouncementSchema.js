import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const AnnouncementSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Alumni', required: true },   
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });

const Announcement = model('Announcement', AnnouncementSchema);

export default Announcement;