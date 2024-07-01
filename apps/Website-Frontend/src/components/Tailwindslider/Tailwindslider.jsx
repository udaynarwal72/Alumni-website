// CardSlider.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios'; // Make sure axios is imported
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CardSlider.css';
import EventCard from '../EventCard/EventCard';

const CardSlider = () => {
    const [eventData, setEventData] = useState([]);
    
    useEffect(() => {
        const gettingAllEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/event/getallevents');
                console.log("This is the event data from tailwind", response.data.data);
                setEventData(response.data.data);
            } catch (error) {
                console.log("Error fetching events", error.message);
            }
        };
        gettingAllEvents();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        beforeChange: (current, next) => setSlideAnimation(current, next),
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-8">
            <Slider {...settings}>
                {eventData.map((event, index) => (
                    <EventCard event={event} key={index} />
                ))}
            </Slider>
        </div>
    );
};

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} bg-gray-800 rounded-full p-2 text-white`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} bg-gray-800 rounded-full p-2 text-white`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
};

export default CardSlider;
