import React from 'react';
import Slider from 'react-slick';
import TestimonialsCard from "./TestimonialsCard";
import './TestimonialsSlider.css'; // Import your CSS file

const TestimonialsSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        centerMode: true, // Enable center mode
        centerPadding: '0', // No padding around the center slide
    };

    return (
        <Slider {...settings}>
            <TestimonialsCard />
            <TestimonialsCard />
            <TestimonialsCard />
            <TestimonialsCard />
            <TestimonialsCard />
        </Slider>
    );
}

export default TestimonialsSlider;
