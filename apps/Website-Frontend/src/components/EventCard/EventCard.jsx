import { useNavigate } from "react-router";
import clockIcon from "../../assets/clock.svg";
import locationIcon from "../../assets/location-blue-icon.svg";
import retnitkaLogo from "../../assets/retnitka-logo.svg";

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const event_date = new Date(event.event_date);

    const redirectToEvent = () => {
        navigate(`/eventpage/${event._id}`)
    }

    return (
        <div onClick={redirectToEvent} className="cursor-pointer">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center bg-gray-100 p-4">
                    <div className="flex flex-col items-center mr-4">
                        <div className="text-2xl font-dmserif font-bold">{event_date.getDate()}</div>
                        <div className="text-sm font-dmsans text-gray-600">{event_date.toLocaleDateString(undefined, { month: 'long' })}</div>
                    </div>
                    <div className="w-px h-12 bg-gray-300"></div>
                    <div className="ml-4">
                        {/* Uncomment and use the logo if needed */}
                        {/* <img src={retnitkaLogo} alt="Event Logo" className="h-12 w-12" /> */}
                    </div>
                </div>
                <div className="p-4 font-dmsans">
                    <h1 className="text-xl font-bold mb-2 ">{event.event_title}</h1>
                    <div className="flex items-center mb-2">
                        <img src={clockIcon} alt="Clock Icon" className="h-6 w-6 mr-2" />
                        <span>{event.start_time} - {event.end_time}</span>
                    </div>
                    <div className="flex items-center">
                        <img src={locationIcon} alt="Location Icon" className="h-6 w-6 mr-2" />
                        <span>{event.event_venue}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
