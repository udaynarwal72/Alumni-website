import React from 'react';
import Slider from 'react-slick';
import TestimonialsCard from "./TestimonialsCard";
import './TestimonialsSlider.css'; // Import your CSS file

const TestimonialsSlider = ({ data }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        arrows: false,
        centerMode: true, // Enable center mode
        centerPadding: '0', // No padding around the center slide
    };

    return (
        <Slider {...settings}>
            {
                data.map((data, index) => {
                    return (
                        <TestimonialsCard data={data} />
                    )
                })
            }
        </Slider>
    );
}

export default TestimonialsSlider;
