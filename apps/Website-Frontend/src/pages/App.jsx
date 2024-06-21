import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import ImageSlider from "../components/imageSlider";
import BlogAndEventSection from "../components/blog-event-container";
import Footer from "../components/footer";
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import Herosection from "../components/HeroSection/HeroSection";
import BlogSlider from "../components/BlogSlider/BlogSlider";
import JobSlider from "../components/JobSlider/JobSlider";
import AlumniSlider from "../components/AlumniSlider/AlumniSlider";
import EventSlider from "../components/EventSlider/EventSlider";
import "../styles/App.css";
import { atom, useRecoilState } from "recoil";
import axios from "axios";

export const userAtom = atom({
    key: 'user',
    default: {},
});

export const userNumber = atom({
    key: 'something',
    default: 0,
});

function App() {
    const [userData, setUserData] = useRecoilState(userAtom);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [someNumber, setSomeNumber] = useRecoilState(userNumber);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setSomeNumber(1); // Setting a number, not a string
            console.log("Setting someNumber to 1");
            try {
                const userToken = localStorage.getItem("token");
                if (!userToken) {
                    throw new Error("No token found");
                }
                const response = await axios.get(`http://localhost:3000/api/v1/user/profilesection`, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                });
                setUserData(response.data.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [setUserData, setSomeNumber]);

    useEffect(() => {
        console.log('userData', userData);
    }, [userData]);

    const requestPermission = async () => {
        const permission = await Notification.requestPermission();
        console.log("Notification permission:", permission);
        if (permission === "granted") {
            try {
                const notificationToken = await getToken(messaging, {
                    vapidKey: "BFpkU0aqgNMz_UWl58wiPnML0h5b_DdiCpsPr8bHEDzJDZ2ISds31aK1-wHJkqikO31lEQ1Qrd97ltYjhhR1SxY",
                });
                console.log("Token generated:", notificationToken);
                localStorage.setItem("notification-token", notificationToken);
            } catch (error) {
                console.error("Error getting notification token:", error);
            }
        } else if (permission === "denied") {
            alert("Sorry, you won't get the latest updates");
        }
    };

    useEffect(() => {
        requestPermission();
    }, []);

    const allAlumni = () => {
        navigate("/alumnisection");
    };

    const blogSection = () => {
        navigate("/blogsection");
    };

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
                <hr className="home" />
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
                    <button onClick={blogSection} className="view-all">View All</button>
                </div>
                <hr className="home" />
                <div className="second-heading">
                    <div className="second-heading-content">
                        <div>
                            <h1>The Alumnis Meet</h1>
                            <hr /><hr />
                        </div>
                    </div>
                </div>
                <EventSlider />
                <button className="view-all">View All</button>
                <hr className="home" />
                <div className="second-heading">
                    <div className="second-heading-content">
                        <div>
                            <h1>Job Section</h1><hr /><hr />
                        </div>
                    </div>
                </div>
                <JobSlider />
                <button className="view-all">View All</button>
				<div className="home-end"></div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
