import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './AlumniSlider.css';
import AlumniCard from '../AlumniCard/AlumniCard';
import axios from 'axios';

const AlumniSlider = () => {
    const [alumni, setAlumni] = useState([]);

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    useEffect(() => {
        console.log("Alumni data updated:", alumni);
    }, [alumni]);

    return (
        <div className="image-slider flex w-full flex-row">
            {alumni.slice(0, 4).map((alumniItem) => (
                <AlumniCard key={alumniItem._id} AlumniData={alumniItem} />
            ))}
            <div className='view-all-container flex  items-center border rounded-lg justify-center m- p-4 pt-5 pb-5 bg-[#022B3A]'>
                <div className='text-white '>
                    View All
                </div>
                <div className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AlumniSlider;
