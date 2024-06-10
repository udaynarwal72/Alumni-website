import React, { useState } from 'react';
import '../styles/HiringPage.css';
import NavBar from '../components/Navbar';
import Footer from '../components/footer';

const HiringPage = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [location, setLocation] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [requirements, setRequirements] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission, like sending the data to a server
        console.log({
            jobTitle,
            jobDescription,
            location,
            companyName,
            requirements,
        });
        alert('Job posted successfully!');
    };

    return (
        <>
            <NavBar />
            <div className='parent-hiring-page'>
                <div className="hiring-page">
                    <h1>Post a Job</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Job Title:
                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Job Description:
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Location:
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Company Name:
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Requirements:
                            <textarea
                                value={requirements}
                                onChange={(e) => setRequirements(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Post Job</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HiringPage;
