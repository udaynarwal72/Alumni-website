import React from 'react';
import axios from 'axios';
import NavBar from '../../components/Navbar';
import Footer from '../../components/footer';
import '../../styles/PostJob.css';

const PostJob = () => {
    const createJob = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const jobData = Object.fromEntries(formData.entries());

        try {
            const response = await axios.post('http://localhost:3000/api/v1/job/postjob', jobData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')} `
                }
            });
            console.log('Job created successfully:', response.data.data);
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="parent-event-form">
                <div className="blog-form-container">
                    <form onSubmit={(e) => { createJob(e) }} className="event-form">
                        <h1>Create Job</h1>
                        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
                        <div className="event-row">
                            <label htmlFor="job_title">Job title:</label>
                            <input type="text" id="job_title" name="job_title" className="demo" required />
                        </div>
                        <div className="event-row2">
                            <div className="event-col">
                                <label>Company:</label>
                                <input type="text" className="event-date" name="job_company" required />
                            </div>
                            <div className="event-col">
                                <label>Company Location:</label>
                                <input type="text" className="event-time" name="job_company_location" required />
                            </div>
                        </div>
                        <div className="event-row">
                            <label>Job Type:</label>
                            <input type="text" className="demo" name="job_type" placeholder="eg: remote or on field" required />
                        </div>
                        <div className="event-row">
                            <label htmlFor="job_duration">Job Duration:</label>
                            <input type="text" id="job_duration" name="job_duration" className="demo" required />
                        </div>
                        <div className="event-row">
                            <label htmlFor="job_apply_link">Apply Link:</label>
                            <input type="text" id="job_apply_link" name="job_apply_link" className="demo" required />
                        </div>
                        <div className="event-row">
                            <label htmlFor="job_apply_email">Apply Email:</label>
                            <input type="email" id="job_apply_email" name="job_apply_email" className="demo" required />
                        </div>
                        <div className="event-row">
                            <label htmlFor="job_tags">Job tags:</label>
                            <input type="text" id="job_tags" className='demo' name="job_tags" placeholder="e.g. android developer, web developer etc.." />
                        </div>
                        <div className="event-row">
                            <label htmlFor="job_tags">Experience required:</label>
                            <input type="text" id="job_tags" className='demo' name="job_experience"/>
                        </div>
                        <div className="event-row">
                            <label htmlFor="job_about_role">Job Description:</label>
                            <textarea id="job_about_role" name="job_about_role" rows="10" required />
                        </div>
                        <div className="event-row">
                            <label htmlFor="job_company_description">Company Description:</label>
                            <textarea id="job_company_description" name="job_company_description" rows="10" required />
                        </div>
                        <button type="submit" className="blog-form-button">Post</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PostJob;
