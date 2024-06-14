import "./EventCard.css";

const EventCard = () => {
	return (
		<div className="parent-event-card">
			<div className="event-card">
				<div className="event-card-header">
					<div className="event-dates">
						<div className="date">15</div>
						<div className="month">June</div>
					</div>
                    <div className="vl"></div>
					<div className="event-card-logo">
						<img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-anarchy-symbol_23-2149244760.jpg?size=626&ext=jpg" />
					</div>
				</div>
                <div className="event-card-title">
                    <h1>Reunion</h1>
                </div>
                <div className="event-card-details">
                    <div className="event-card-timing">
                        <div className="event-card-icon">
                            <img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
                        </div>
                        <div className="event-card-time">7 PM - 9PM</div>
                        
                    </div>
                    <div className="event-card-location">
                        <div className="event-card-icon">
                            <img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
                        </div>
                        <div className="event-card-loc">Gurgaon</div>
                        
                    </div>
                </div>
			</div>
		</div>
	);
};

export default EventCard;
