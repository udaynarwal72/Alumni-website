import React, { useEffect } from 'react';
import Slider from 'react-slick';
import "./EventSlider.css";
import axios from 'axios';
import EventCard from "../EventCard/EventCard"
import { atom, useRecoilState } from 'recoil';

const eventAtom = atom({
    key: 'eventData',
    default: [],
});
const EventSlider = () => {
    const [eventData, setEventData] = useRecoilState(eventAtom);
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

    useEffect(() => {
        const gettingAllEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/event/getallevents');
                console.log("This is the event data", response.data.data)
                setEventData(response.data.data);
            } catch (error) {
                console.log("Error fetching events", error.message)
            }
        }
        gettingAllEvents();
    }, [])


    return (
        <div className="image-slider">
            <Slider {...settings}>
                {eventData.map((event, index) => {
                    return (
                        <EventCard key={index} event={event} />
                    )
                })}
            </Slider>
        </div>
    );
};

export default EventSlider;
