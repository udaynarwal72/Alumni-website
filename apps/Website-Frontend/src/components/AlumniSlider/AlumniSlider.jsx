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
        slidesToShow: 4,
        slidesToScroll: 4,
        // autoplay: true,
        // autoplaySpeed: 1000,
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
        <div className="image-slider">
            <Slider {...settings}>
                {alumni.map((alumniItem) => (
                    <AlumniCard key={alumniItem._id} AlumniData={alumniItem} />
                ))}
            </Slider>
        </div>
    );
};

export default AlumniSlider;
