import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import GalleryCard from './GalleryCard';

const GalleryCardSlider = ({ data }) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const handleScroll = (event) => {
            const slider = sliderRef.current;
            if (event.deltaY > 0) {
                slider.slickNext(); // Scroll to the next slide
            } else {
                slider.slickPrev(); // Scroll to the previous slide
            }
        };

        document.addEventListener('wheel', handleScroll); // Add event listener for mouse wheel

        return () => {
            document.removeEventListener('wheel', handleScroll); // Clean up the event listener
        };
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 3000, // Adjust the speed (in milliseconds)
        slidesToShow: 3,
        slidesToScroll: 1, // Changed to scroll one slide at a time
        autoplay: true,
        autoplaySpeed: 0, // Set to 0 for continuous autoplay
        cssEase: 'linear',
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
        <div className="gallery-slider w-full">
            <Slider ref={sliderRef} {...settings}>
                {/* {data.map((item, index) => (
                    <GalleryCard key={index} />
                ))} */}
                <GalleryCard/>
                <GalleryCard/>
                <GalleryCard/>
                <GalleryCard/>
                <GalleryCard/>
                <GalleryCard/>
                <GalleryCard/>
                <GalleryCard/>
                <GalleryCard/>
                <GalleryCard/>
                <GalleryCard/>
                <GalleryCard/>
            </Slider>
        </div>
    );
};

export default GalleryCardSlider;