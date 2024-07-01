import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './BlogSlider.css'; // Importing CSS file for styling
import BlogCard from '../BlogCard/BlogCard';
import axios from 'axios';
import API_URL from '../../helpers/ApiKey';

const BlogSlider = () => {
    const [blogData, setBlogData] = useState([]); // Initial state as an empty array
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        const getBlogData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/blog/bulk`);
                console.log('This is slider response:', response.data.data);
                if (Array.isArray(response.data.data)) {
                    setBlogData(response.data.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };
        getBlogData();
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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
            <div s>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='w-full flex '>  
                            {blogData.map((blogItem, index) => (
                                <BlogCard key={index} data={blogItem} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogSlider;
