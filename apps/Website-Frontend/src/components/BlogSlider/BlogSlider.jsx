import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './BlogSlider.css'; // Importing CSS file for styling
import BlogCard from '../BlogCard/BlogCard';
import axios from 'axios';

const BlogSlider = () => {
    const [blogData, setBlogData] = useState([]); // Initial state as an empty array
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        const getBlogData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/blog/bulk');
                console.log('this is slider response',response.data.data)
                if (Array.isArray(response.data.data)) {
                    setBlogData(response.data.data);
                    
                } else {
                    console.error("Unexpected response format:", response.data);
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };
        getBlogData();
        console.log("this is blog data slider side",blogData)
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="image-slider">
            {loading ? (
                <p>Loading...</p> // Display loading indicator while fetching data
            ) : (
                <Slider {...settings}>
                    {blogData.map((blogItem, index) => (
                        <BlogCard key={index} data={blogItem} />
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default BlogSlider;
