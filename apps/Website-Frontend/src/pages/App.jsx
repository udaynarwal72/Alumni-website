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
		<>
			<NavBar />
			<Herosection />
			<BlogSlider />
			<ImageSlider />
			<Footer />
		</>
	);
}

export default App;
