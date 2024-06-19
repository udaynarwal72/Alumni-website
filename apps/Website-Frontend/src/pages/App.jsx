import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import ImageSlider from "../components/imageSlider";
import BlogAndEventSection from "../components/blog-event-container";
import Footer from "../components/footer";
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import { BrowserRouter } from "react-router-dom";
import Herosection from "../components/HeroSection/HeroSection";
import BlogSlider from "../components/BlogSlider/BlogSlider";
import JobSlider from "../components/JobSlider/JobSlider";
import AlumniSlider from "../components/AlumniSlider/AlumniSlider";
import EventSlider from "../components/EventSlider/EventSlider";
import "../styles/App.css";

function App() {
	const [count, setCount] = useState(0);
	async function requestPermission() {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			const notificationToken = await getToken(messaging, {
				vapidKey:
					"BFpkU0aqgNMz_UWl58wiPnML0h5b_DdiCpsPr8bHEDzJDZ2ISds31aK1-wHJkqikO31lEQ1Qrd97ltYjhhR1SxY",
			});
			console.log("Token generated", notificationToken);
			localStorage.setItem("notification-token", notificationToken);
		} else if (permission === "denied") {
			alert(`Sorry you won't get the latest update`);
		}
	}
	useEffect(() => {
		//request user for notification permission
		requestPermission();
	}, []);
	const allAlumni = () => {
		window.location.href = "/alumnisection";
	}
	const blogSection = () => {
		window.location.href = "/blogsection";
	}
	return (
		<div style={{ backgroundColor: "#F9F5EB", minHeight: "100vh" }}>
			<NavBar />
			<div className="parent-container">
				<Herosection />
				<div className="-first heading">
					<div className="first-heading-content">
						<div>
							<h1>Our Alumni</h1>
							<hr /><hr />
						</div>
					</div>
				</div>

				<AlumniSlider />
				<div className="alumni-end">
					<div className="view-all-button">
						<button onClick={allAlumni} className="view-all">View All</button>
					</div>
				</div>
				<hr className="home"></hr>
				<div className="second-heading">
					<div className="second-heading-content">
						<div>
							<h1>Alumni Write..</h1>
							<hr /><hr />
						</div>
					</div>
				</div>
				<BlogSlider />
				<div className="view-all-button">
					<button onClick={blogSection}>View All</button>
				</div>
				<hr className="home"></hr>
				<div className="second-heading">
					<div className="second-heading-content">
						<div>
							<h1>The Alumnis Meet</h1>
							<hr /><hr />
						</div>
					</div>
				</div>
				<EventSlider />
				<button>View All</button>
				<hr className="home"></hr>
				<div className="second-heading">
					<div className="second-heading-content">
						<div>
							<h1>Job Section</h1><hr /><hr />
						</div>
					</div>
				</div>
				<JobSlider />
				<button>View All</button>
			</div>

			<Footer />
		</div>
	);
}

export default App;
