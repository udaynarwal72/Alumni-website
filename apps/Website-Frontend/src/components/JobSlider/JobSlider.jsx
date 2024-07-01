import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import JobCard from '../JobCard/JobCard';
import axios from 'axios';

const JobSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        // autoplay: true,
        // autoplaySpeed: 5000, // Uncomment this line if you want to enable autoplay
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

    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/job/alljobs');
                console.log(response.data.data);
                setJobData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching job data:", error);
                setLoading(false);
            }
        };
        fetchJobData();
    }, []);

    return (
        <div className="job-slider mx-auto my-8 max-w-screen-lg">
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <Slider {...settings}>
                    {jobData.slice(0, 4).map((job, index) => (
                        <React.Fragment key={index}>
                            <JobCard data={job} />
                        </React.Fragment>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default JobSlider;
