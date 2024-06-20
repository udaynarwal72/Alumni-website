import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import "../styles/EventInfo.css";

const EventInfo = () => {
	return (
		<>
			<NavBar />
			<div className="parent-event-info">
				<div id="ellipse">
					<div className="event-name">
						<h1>MEHFIL</h1>
						<h3>A musical mehfil/reunion</h3>
					</div>
					<div className="event-infos">
						<div className="event-col">
							<div>Date-22/06/24</div>
							<div>Mode-Online</div>
						</div>
						<div className="event-col">
							<div>Guest-Lorem Ipsum</div>
							<div>Time- 5pm-7pm</div>
						</div>
					</div>
				</div>

				<div className="middle-container">
					{/* <div className="exc-h"><h1 className="excited">Excited for Event?</h1></div> */}
					<div className="middle-row">
						<div className="ev-img">
							<img src="https://marketplace.canva.com/EAFJMl8KcjI/1/0/1131w/canva-purple-black-tropical-party-club-poster-orVwDS2lrfY.jpg"></img>
						</div>
						<div className="about-event">
							<div>
								<h1>About the Event?</h1>
							</div>
							<div className="event-para">
								<h3>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Laborum vitae architecto quaerat sint laboriosam nulla
									repellendus. Soluta, nostrum fugiat. Voluptas nulla fugiat
									accusamus non illo ea sed molestias saepe ab nostrum soluta in
									eaque, reiciendis doloremque mollitia laudantium natus
									voluptates molestiae quibusdam earum! Earum, exercitationem.
								</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="ending">
					<div className="end-container">
						<div className="end-inside">
							<div>
								<div><h5>Upcoming event</h5></div>
								<div><h1>Mehfil</h1></div>
							</div>
						</div>
						<div className="sec">
							<div>
								<span><h1>10</h1></span>
								<span><h5>Days</h5></span>
							</div>
							<div>
							<span><h1>22</h1></span>
							<span><h5>Hours</h5></span>
							</div>
							<div>
							<span><h1>55</h1></span>
							<span><h5>Minutes</h5></span>
							</div>
							<div>
							<span><h1>20</h1></span>
							<span><h5>Seconds</h5></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default EventInfo;
