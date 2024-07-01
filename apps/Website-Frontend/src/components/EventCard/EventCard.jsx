import { useNavigate } from "react-router";
import clockIcon from "../../assets/clock.svg";
import locationIcon from "../../assets/location-blue-icon.svg";
import "./EventCard.css";
import retnitkaLogo from "../../assets/retnitka-logo.svg";

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
                        <div className="vl">

                        </div>
                        <div className="event-card-logo ">
                            <img src={retnitkaLogo} alt="" />
                        </div>
                    </div>
                    <div className="event-card-title">
                        <h1>{event.event_title}</h1>
                    </div>
                    <div className="event-card-details">
                        <div className="event-card-timing">
                            <div className="event-card-icon">
                                <img src={clockIcon} height='49px' width='48px'></img>
                            </div>
                            <div className="event-card-time">{event.start_time} -{event.end_time}</div>
                        </div>
                        <div className="event-card-location">
                            <div className="event-card-icon">
                                <img src={locationIcon}></img>
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
