import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const JobSchema = new Schema({
    job_title: {
        type: String,
        required: true,
    },//
    job_tags: [{ type: String, required: true }],
    job_company: {
        type: String,
        required: true,
    },//
    job_company_location: {
        type: String,
        required: true,
    },//
    job_postedBy: {
        type: Schema.ObjectId,
        required: true,
        ref:'Alumni'
    },
    job_type: {
        type: String,
        required: true,
    },//
    job_duration: {
        type: String,
        required: true,
    },
    job_company_description: {
        type: String,
        default: "No Description",
    },
    job_about_role: {
        type: String,
        default: "No Description",
    },
    job_apply_email: {
        type: String,
        default: "No email",
    },
    job_apply_link: {
        type: String,
        default: "No link"
    },
    job_experience:{
        type:String,
        default: 0
    }
}, { timestamps: true });

const JobData = model('Job', JobSchema);

export default JobData;