"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [JobData, setJobData] = useState([]);

    const JobDataFunc = () => {
        console.log('Fetching data from API...');

        axios.get('http://localhost:3000/api/v1/job/alljobs')
            .then(res => {
                const allJobs = res.data.data;
                setJobData(allJobs);
                console.log('Data fetched: ', allJobs);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    };

    const JobRemove = (id) => {
        console.log('Removing job with id:', id);

        axios.delete(`http://localhost:3000/api/v1/admin/deletejob/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log('Job removed:', res.data);
                JobDataFunc();
            })
            .catch(error => {
                console.error('Error removing job:', error);
            });
    };

    const handleRemoveClick = (id) => {
        const confirmation = window.confirm('Are you sure you want to remove this job?');
        if (confirmation) {
            JobRemove(id);
        }
    };

    useEffect(() => {
        JobDataFunc();
    }, []);

    const setJobRemoving = (jobId) => {
        const updatedJobs = JobData.map(job => {
            if (job._id === jobId) {
                return { ...job, isRemoving: true };
            }
            return job;
        });
        setJobData(updatedJobs);
    };

    const renderActionButton = (job) => {
        if (job.isRemoving) {
            return (
                <button className="btn btn-primary" onClick={() => handleRemoveClick(job._id)}>Confirm</button>
            );
        } else {
            return (
                <button className="btn btn-danger" onClick={() => setJobRemoving(job._id)}>Remove</button>
            );
        }
    };

    return (
        <main className="overflow-scroll flex-1 align-center justify-center">
            <table className="table m-5 w-auto">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Company</th>
                        <th scope="col">Posted By</th>
                        <th scope="col">Role Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {JobData.map((job, index) => (
                        <tr key={job._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{job.job_title}</td>
                            <td>{job.job_company}</td>
                            <td>{job.job_postedBy.username}</td>
                            <td>{job.job_about_role}</td>
                            <td>{renderActionButton(job)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
