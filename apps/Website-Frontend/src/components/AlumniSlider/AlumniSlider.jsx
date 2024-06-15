import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './AlumniSlider.css';
import AlumniCard from '../AlumniCard/AlumniCard';
import axios from 'axios';

const AlumniSlider = () => {
    const [alumni, setAlumni] = useState([]);

    // useEffect(() => {
    //     const fetchAlumni = async () => {
    //         try {
    //             const myresponse = await axios.get('http://localhost:3000/api/v1/user/findalumni');
    //             if (Array.isArray(myresponse.data)) {
    //                 setAlumni(myresponse.data); // Ensure the response is an array
    //             } else {
    //                 console.error("Unexpected response format:", response.data);
    //             }
    //             console.log(myresponse.data);
    //         } catch (error) {
    //             console.error("Error fetching alumni data:", error);
    //         }
    //     };

    //     fetchAlumni();
    // }, []);
    // console.log(alumni);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1000,
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

    return (
        <div className="image-slider">
            <Slider {...settings}>
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
            </Slider>
        </div>
    );
};

export default AlumniSlider;
