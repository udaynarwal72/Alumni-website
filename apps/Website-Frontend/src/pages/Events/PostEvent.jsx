import NavBar from "../../components/Navbar";
import Footer from "../../components/footer";
import "../../styles/PostEvent.css";

const PostEvent = () => {
	return (
		<>
			<NavBar />
			<div className="parent-event-form">
				<div className="blog-form-container">
					<form method="POST" className="event-form">
						<h1 className="hel">Create Event</h1>
						<div className="event-row">
							<label htmlFor="name">Event Name:</label>
							<input
								type="text"
								id="event_title"
								className="event-title"
								name="event_title"
								required
							></input>
						</div>

						<div className="event-row2">
							<div className="event-col">
								
									<label>Date</label>
								
								
									<input type="date" className="event-date" required></input>
								
							</div>
							<div className="event-col">
								
									<label>Time</label>
								
								
									<input type="time" className="event-time" required></input>
								
							</div>
						</div>
						<div className="event-row">
							<label htmlFor="name">Venue:</label>
							<input
								type="text"
								id="event_venue"
								className="demo"
								name="event_title"
								required
							></input>
						</div>

						<div className="event-row">
							<label htmlFor="name">Coming Alumni:</label>
							<input
								type="text"
								id="coming-alumni"
								className="demo"
								name="event_title"
								required
							></input>
						</div>

						<label htmlFor="body">Event Description:</label>
						<textarea
							id="event_body"
							name="blog_body"
							rows="10"
							required
						></textarea>

						<button type="submit" className="blog-form-button">
							Post
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default PostEvent;
