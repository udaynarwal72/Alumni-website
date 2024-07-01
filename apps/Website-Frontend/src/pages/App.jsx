import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { messaging } from "../firebase";
import JobSlider from "../components/JobSlider/JobSlider";
import AlumniSlider from "../components/AlumniSlider/AlumniSlider";
import { atom, useRecoilState } from "recoil";
import CardSlider from "../components/Tailwindslider/Tailwindslider";
import HeroSection from "../components/HeroSection/HeroSection";
import BlogSectionCard from "../components/Blog-section-card/BlogSectionCard";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import GalleryCard from "../components/GalleryCard/GalleryCard";
import GalleryCardSlider from "../components/GalleryCard/GalleryCardSlider";
import BlogCard from "../components/BlogCard/BlogCard";
import BlogSlider from "../components/BlogSlider/BlogSlider";
import TestimonialsSlider from "../components/Testimonials/TestimonialsSlider";
import API_URL from "../helpers/ApiKey";

export const userNumber = atom({
    key: 'something',
    default: 0,
});

function Testapp() {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [someNumber, setSomeNumber] = useRecoilState(userNumber);
    const [images, setImage] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    const getAllImage = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/admin/getallimage');
            console.log("All images:", res.data.data);
            setImage(res.data.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        getAllImage();
    }, []);

    const requestPermission = async () => {
        const permission = await Notification.requestPermission();
        console.log("Notification permission:", permission);
        if (permission === "granted") {
            try {
                const notificationToken = await messaging.getToken({
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

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/v1/blog/bulk');
            if (Array.isArray(response.data.data)) {
                setBlogs(response.data.data);
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (err) {
            setError("Error fetching blog data: " + err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const itemsPerPage = 5;
    const filteredBlogs = blogs;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
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

    useEffect(() => {
        const getAllTestimonials = async () => {
            await axios.get(`${API_URL}/api/v1/announcement/getannouncements`)
                .then(res => {
                    setTestimonials(res.data.data)
                })
                .catch(error => {
                    console.log("Error fetching details of Testimonials", error.message);
                })
        }
        getAllTestimonials();
    }, [])

    return (
        <div>
            <NavBar />
            <div className="parent-container">
                <div className="bg-[#E1E5F2] w-full border-rounded">
                    <HeroSection images={images} />
                </div>
                <div className="parent-alumnislider pt-9 pb-9 w-full bg-[#E1E5F2]">
                    <div className="alumni-heading">
                        <h1 className="text-4xl text-center text-[#022B3A] font-dmserif font-semibold">
                            Our Alumni
                        </h1>
                        <div className="w-full">
                            <AlumniSlider />
                        </div>
                    </div>
                </div>
                <div>

                </div>
                <div className="parent-blogandanouncement w-full  bg-[#1F7A8C]">
                    <div className="blog-parent pt-9 pb-9">
                        <div className="blog-heading">
                            <h1 className="text-4xl text-center text-white font-dmserif font-semibold">
                                Blogs
                            </h1>
                            <div className="w-full flex">
                                <BlogSlider />
                            </div>
                            <div className="text-center mt-4">
                                <button type="button" className="text-white bg-[#022B3A] font-medium font-dmsans rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={blogSection}>View All</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="job-section-parent bg-[#022B3A] pt-9 pb-9 w-full">
                    <h1 className="text-4xl mt-9 text-center text-white font-dmserif font-semibold">
                        Job Section
                    </h1>
                    <JobSlider />
                </div>
                <div className="job-section-parent bg-[#E1E5F2] pt-9 pb-9 w-full">
                    <h1 className="text-4xl mt-9 mb-9 text-center text-[#022B3A] font-dmserif font-semibold">
                        Announcements
                    </h1>
                    <TestimonialsSlider data={testimonials} />
                </div>
                <div className="galery-section-parent pb-9 pt-9 flex flex-col items-center bg-[#1F7A8C] justify-center  w-full">
                    <h1 className="text-4xl mt-9 text-center text-white font-dmserif font-semibold">
                        Gallery
                    </h1>
                    <div className="w-full flex flex-row">
                        <GalleryCardSlider />
                    </div>
                </div>
                <div className="job-section-parent bg-[#E1E5F2] pt-9 pb-9 w-full">
                    <h1 className="text-4xl text-center text-[#022B3A] font-dmserif font-semibold">
                        Events
                    </h1>
                    <CardSlider />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Testapp;
