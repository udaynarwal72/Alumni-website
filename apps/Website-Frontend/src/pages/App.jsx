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
	return (
		<div style={{ backgroundColor: "#F9F5EB", minHeight: "100vh" }}>
			<NavBar />
			<div className="parent-container">
				<Herosection />
				<div className="-first heading">
					<div className="first-heading-content">
						<button>Our Alumnis</button>
						<div>
							<h1>Connect Your Batchmates</h1>
						</div>
					</div>
				</div>

				<AlumniSlider />
				<div className="alumni-end">
					<div className="view-all-button">
						<button className="view-all">View All</button>
					</div>
				</div>
				<hr className="home"></hr>
				<div className="second-heading">
					<div className="second-heading-content">
						<button>Blogs</button>
						<div>
							<h1>Alumnis Write..</h1>
						</div>
					</div>
				</div>
				<BlogSlider />
				<hr className="home"></hr>
				<div className="second-heading">
					<div className="second-heading-content">
						<button>Events</button>
						<div>
							<h1>The Alumnis Meet</h1>
						</div>
					</div>
				</div>
				<EventSlider />
				<hr className="home"></hr>
				<div className="second-heading">
					<div className="second-heading-content">
						<button>Jobs</button>
						<div>
							<h1>Job Section</h1>
						</div>
					</div>
				</div>
				<JobSlider />
				{/* <ImageSlider /> */}
			</div>

			<Footer />
		</div>
	);
}

export default App;
