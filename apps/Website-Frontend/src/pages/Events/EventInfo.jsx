import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer";
import "../../styles/EventInfo.css";
import axios from "axios";
import { useParams } from "react-router";

const EventInfo = () => {
	const { eventId } = useParams();
	const [eventDetails, setEventDetails] = useState({});
	const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

	useEffect(() => {
		const fetchEventDetails = async () => {
			const response = await axios.get(`http://localhost:3000/api/v1/event/findeventbyid/${eventId}`);
			setEventDetails(response.data.data);
		};
		fetchEventDetails();
	}, [eventId]);

	useEffect(() => {
		if (eventDetails.event_date) {
			const targetDate = new Date(eventDetails.event_date);

			const updateTimeRemaining = () => {
				const now = new Date();
				const difference = targetDate - now;

				if (difference <= 0) {
					setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
				} else {
					const days = Math.floor(difference / (1000 * 60 * 60 * 24));
					const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
					const seconds = Math.floor((difference % (1000 * 60)) / 1000);
					setTimeRemaining({ days, hours, minutes, seconds });
				}
			};

			updateTimeRemaining();
			const interval = setInterval(updateTimeRemaining, 1000);
			return () => clearInterval(interval);
		}
	}, [eventDetails.event_date]);

	return (
		<>
			<NavBar />
			<div className="parent-event-info">
				<div id="ellipse">
					<div className="event-name">
						<h1>{eventDetails.event_title}</h1>
						<h3>{eventDetails.event_hashtags?.join(", ")}</h3>
					</div>
					<div className="event-infos">
						<div className="event-col">
							<div><span style={{ fontWeight: "bold" }}> Date</span> - {new Date(eventDetails.event_date).toLocaleDateString()}</div>
							<div><span style={{ fontWeight: "bold" }}> Venue</span> - {eventDetails.event_venue}</div>
						</div>
						<div className="event-col">
							<div><span style={{ fontWeight: "bold" }}>Type</span> - {eventDetails.live_stream_link ? "Online" : "Offline"}</div>
							<div><span style={{ fontWeight: "bold" }}>Time</span> - {eventDetails.start_time} - {eventDetails.end_time}</div>
						</div>
					</div>
				</div>

				<div className="middle-container">
					<div className="middle-row">
						<div className="ev-img">
							<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7EksNI3HN5R-ShASsqO9J5XZO5PNe-t1rg&s" alt="Event" />
						</div>
						<div className="about-event">
							<div>
								<h1>About the Event</h1>
							</div>
							<div className="event-para">
								<h3>
									{eventDetails.event_body}
								</h3>
							</div>
							<h2 className="event-link">Link for meetup: </h2><p>{eventDetails.live_stream_link}</p>
						</div>
					</div>
				</div>

				<div className="ending">
					<div className="end-container">
						<div className="end-inside">
							<div>
								<h1 className="left-h1">Time Left:</h1>
							</div>
						</div>
						<div className="sec">
							{timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0 ? (
								<div>Event is closed</div>
							) : (
								<>
									<div>
										<span>
											<h1>{timeRemaining.days}</h1>
										</span>
										<span>
											<h5>Days</h5>
										</span>
									</div>
									<div>
										<span>
											<h1>{timeRemaining.hours}</h1>
										</span>
										<span>
											<h5>Hours</h5>
										</span>
									</div>
									<div>
										<span>
											<h1>{timeRemaining.minutes}</h1>
										</span>
										<span>
											<h5>Minutes</h5>
										</span>
									</div>
									<div>
										<span>
											<h1>{timeRemaining.seconds}</h1>
										</span>
										<span>
											<h5>Seconds</h5>
										</span>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default EventInfo;
