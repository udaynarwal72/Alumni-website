// CardSlider.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
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
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
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
    };

    return (
        <div className="w-full max-w-6xl mx-auto py-4">
            <Slider {...settings}>
                {eventData.map((event, index) => (
                    <EventCard event={event} key={index} />
                ))}
            </Slider>
        </div>
    );
};

export default CardSlider;
