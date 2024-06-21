import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './JobSlider.css'; // Importing CSS file for styling
// import BlogCard from '../BlogCard/BlogCard';
import JobCard from '../JobCard/JobCard'
import axios from 'axios'
const JobSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        // autoplay: true,
        // autoplaySpeed: 5000 autoplay image,
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
    const [jobData, setjobData] = useState([]);
    useEffect(() => {
        const gettingJobData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/job/alljobs')
                console.log(response.data.data)
                setjobData(response.data.data)
            } catch (error) {
                console.log("Error fetching Job data");
            }
        }
        gettingJobData();
    }, [])


    return (
        <div className="image-slider">
            <Slider {...settings}>
                {
                    jobData.map((job, index) => {
                        return (
                            <JobCard key={index} data={job} />
                        )
                    })
                }
            </Slider>
        </div>
    );
};

export default JobSlider;

//alumni slider
//event card -->slider
//job card -->slider

