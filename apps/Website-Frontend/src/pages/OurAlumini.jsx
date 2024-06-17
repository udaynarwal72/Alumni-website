import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlumniCard from "../components/AlumniCard/AlumniCard";
import NavBar from '../components/Navbar';
import Footer from '../components/footer';
import "../styles/OurAlumni.css";

const OurAlumni = () => {
    const [alumni, setAlumni] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const alumniPerPage = 20;

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                console.log("Fetching alumni data...");
                const response = await axios.get('http://localhost:3000/api/v1/user/findalumni');
                if (Array.isArray(response.data.data)) {
                    setAlumni(response.data.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                }
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching alumni data:", error);
            }
        }
        fetchAlumni();
    }, []);

    // Calculate the indexes for the current page
    const indexOfLastAlumni = currentPage * alumniPerPage;
    const indexOfFirstAlumni = indexOfLastAlumni - alumniPerPage;
    const currentAlumni = alumni.slice(indexOfFirstAlumni, indexOfLastAlumni);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const allAlumni = () => {
        window.location.href = "/alumnisection";
    }
    const branchAlumni = () => {

    }
    const branchFilter = () => {

    }
    const companyFilter = () => {

    }
    return (
        <div>
            <NavBar />
            <div className="Parent">
                <h1>Alumni</h1>
                <div className="heading">
                    <div><button onClick={allAlumni} >All</button></div>
                    <div><button>Nearby</button></div>
                    <div><button onClick={branchAlumni}>My Batch</button></div>
                    <div><button onClick={branchFilter}>My Branch</button></div>
                    <div><button onClick={companyFilter}>My Company</button></div>
                    <div><button >My Designation</button></div>
                </div>
                <div className="card-holder">
                    {currentAlumni.map((alumniItem) => (
                        <AlumniCard
                            key={alumniItem._id}
                            AlumniData={alumniItem}
                        />
                    ))}
                </div>
                <div className="pagination">
                    {Array.from({ length: Math.ceil(alumni.length / alumniPerPage) }, (_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OurAlumni;
