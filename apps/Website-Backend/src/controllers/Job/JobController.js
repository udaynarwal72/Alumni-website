import JobData from '../../Schema/JobSchema.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';

const getAllJobs = async (req, res) => {
    try {
        const jobs = await JobData.find().populate('job_postedBy', 'username');
        return res.status(200).json(new ApiResponse(200, jobs, "Jobs data fetched"));
    } catch (error) {
        console.error("Error fetching jobs data:", error); // Logging the error
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}

const postJob = async (req, res) => {
    try {
        console.log(req.body);
        const { job_title, job_tags, job_company, job_company_location, job_type, job_duration, job_company_description, job_about_role, job_apply_email, job_apply_link, job_experience } = req.body;
        
        const calculate_job_tags = job_tags.split(",").filter((tag) => tag.trim() !== "");
        
        const jobs = await JobData.create({
            job_title,
            job_tags: calculate_job_tags,
            job_company,
            job_company_location,
            job_postedBy: req.user._id,
            job_type,
            job_duration,
            job_company_description,
            job_about_role,
            job_apply_email,
            job_apply_link,
            job_experience,
        });

        return res.status(200).json(new ApiResponse(200, jobs, "Job created Successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, null, "Internal Server Error"));
    }
};


const getJobById = async (req, res) => {
    const { jobId } = req.params
    try {
        const findJob = await JobData.findById(jobId);
        console.log("Job Data",findJob);
        return res.status(200).json(new ApiResponse(200, findJob, "Job data fetched"))
    } catch (error) {
        return res.status(500).json(new ApiError(500, null, "Internal Server Error"));
    }
}

export {
    getAllJobs,
    postJob,
    getJobById,
}
