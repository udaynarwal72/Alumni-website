import { useNavigate } from "react-router";
import "./EventCard.css";

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const event_date = new Date(event.event_date);

    const redirectToEvent = () => {
        navigate(`/eventpage/${event._id}`)
    }
    return (
        <div onClick={redirectToEvent} >
            <div className="parent-event-card">
                <div className="event-card">
                    <div className="event-card-header">
                        <div className="event-dates">
                            <div className="date">{event_date.getDate()}</div>
                            <div className="month">{event_date.toLocaleDateString(undefined, { month: 'long' })}</div>
                        </div>
                        <div className="vl"></div>
                        <div className="event-card-logo">
                        </div>
                    </div>
                    <div className="event-card-title">
                        <h1>{event.event_title}</h1>
                    </div>
                    <div className="event-card-details">
                        <div className="event-card-timing">
                            <div className="event-card-icon">
                                <img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
                            </div>
                            <div className="event-card-time">{event.start_time} -{event.end_time}</div>
                        </div>
                        <div className="event-card-location">
                            <div className="event-card-icon">
                                <img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
                            </div>
                            <div className="event-card-loc">{event.event_venue}</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
