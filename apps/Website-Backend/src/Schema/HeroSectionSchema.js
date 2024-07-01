import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const HeroSectionSchema = new Schema({
    coverImage: { type: String, required: true }, 
    isPublished: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });

const HeroSection = model('HeroSection', HeroSectionSchema);

export default HeroSection;