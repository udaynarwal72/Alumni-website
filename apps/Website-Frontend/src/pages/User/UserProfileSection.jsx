import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer"; // Correct capitalization
import Cookies from "js-cookie";
import "../../styles/UserProfilepage.css";
import BlogSectionCard from "../../components/Blog-section-card/BlogSectionCard";
import { useRecoilValue, useSetRecoilState, atom } from "recoil";

export const userAtom = atom({
	key: 'user',
	default: {},
});

const UserProfile = () => {
	const navigate = useNavigate();
	const { userId } = useParams();
	const [userBlog, setUserBlog] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [user, setUserData] = useState({});

	useEffect(() => {
		console.log("user data from profile page", user);
	}, [user]);

	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
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
	}, [setUserData]);

	useEffect(() => {
		const fetchUserBlogs = async () => {
			setLoading(true);
			try {
				const userToken = localStorage.getItem('token');
				const response = await axios.get(`http://localhost:3000/api/v1/blog/author/${userId}`, {
					headers: {
						'Authorization': `Bearer ${userToken}`
					}
				});
				setUserBlog(response.data.data);
			} catch (error) {
				console.error("Error fetching user blogs:", error);
				setError("Failed to fetch user blogs. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchUserBlogs();
	}, [userId]);

	useEffect(() => {
		const emailLink = document.getElementById('emailLink');
		if (emailLink) {
			emailLink.href = `mailto:${user.email}`;
		}
	}, [user.email]);

	useEffect(() => {
		console.log("blog data", userBlog);
	}, [userBlog]);

	const createBlog = () => {
		navigate("/createblog");
	};

	const completeProfile = () => {
		navigate("/completeprofile");
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const createEvent = () => {
		navigate("/postevent");
	};

	const createJob = () => {
		navigate("/postjob");
	};

	const navigateToEditSection = () => {
		navigate('/editprofile');
	};

	return (
		<>
			<NavBar />
			<div className="parent-user">
				<div className="upper-section">
					<div className="profile-card">
						<div className="upper-portion">
							<div className="profile-pic border-box ">
								<img src={user.avatar} alt="Profile Pic" />
							</div>
							<div className="user-name">
								<div>{user.first_name} {user.last_name}</div>
								<span style={{ fontWeight: "bold" }}>{user.organisation}</span>
							</div>
							<div className="edit-button">	
								<button onClick={createBlog}>Post Blog</button>
								<button onClick={createEvent}>Post Event</button>
								<button onClick={createJob}>Post Job</button>
								<button onClick={completeProfile}>Complete Profile</button>
							</div>
						</div>
						<div className="lower-portion">
							<div className="user-profile-info">
								<div className="user-mail">
									<div className="loco-logo">
										<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg" alt="Logo" />
									</div>
									<div>{user.email}</div>
								</div>
								{
									(user.phone_visible) ? (

										<div className="user-phone">
											<div className="loco-logo">
												<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg" alt="Logo" />
											</div>
											<div>{user.phone_number}</div>
										</div>
									) : (
										<div className="user-phone">
											<div className="loco-logo">
												<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg" alt="Logo" />
											</div>
											<div>Hidden</div>
										</div>
									)
								}
								<div className="user-loco">
									<div className="loco-logo">
										<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg" alt="Logo" />
									</div>
									<div>{user.current_city}</div>
								</div>
							</div>
						</div>
					</div>
					<div className="profile-links">
						<div className="unique-link">
							<div className="link1">
								<div className="link-logo">
									<a href="https://www.linkedin.com">
										<img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" alt="LinkedIn" />
									</a>
								</div>
								<div>LinkedIn</div>
							</div>
							<div className="link2">
								<div className="link-logo">
									<a href={user.instagram_handle}>
										<img src="../../assets/instagramimage.jpg" alt="Instagram" />
									</a>
								</div>
								<div>Instagram</div>
							</div>
						</div>
						<div className="unique-link">
							<div className="link1">
								<div className="link-logo">
									<a id="emailLink">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6qGmoUH55tCoXEvccuBA09KNqL9n5pSupnQ&s" alt="Gmail" />
									</a>
								</div>
								<div>Gmail</div>
							</div>
							<div className="link2">
								<div className="link-logo">
									<a href={user.facebook_profile}>
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s" alt="Facebook" />
									</a>
								</div>
								<div>Facebook</div>
							</div>
						</div>
					</div>
				</div>
				<div className="lower-section">
					<div className="profile-right-panel">
						<div className="profile-line1">
							<div className="profile-heading">
								<h1>Personal Info</h1>
							</div>
							<div className="edit-button">
								<button onClick={navigateToEditSection}>Edit</button>
							</div>
						</div>
						<div className="all-list">
							<div className="inner">
								<div><h3>Batch:</h3></div>
								<div><h4>{user.joining_batch}-{Number(user.joining_batch) + 4}</h4></div>
							</div>
							<div className="inner">
								<div><h3>Branch:</h3></div>
								<div><h4>{user.branch}</h4></div>
							</div>
							<div className="inner">
								<div><h3>City:</h3></div>
								<div><h4>{user.current_city}</h4></div>
							</div>
							<div className="inner">
								<div><h3>Achievements:</h3></div>
								<ul>
									<div><h4>{user.awards?.map((award, index) => (
										<li key={index}>{award}</li>
									))}</h4></div>
								</ul>
							</div>
						</div>
					</div>
					<div className="profile-recent">
						<h1>Recent Posts</h1>
						<div className="recent-blogs">
							{userBlog.map((blog) => (
								<BlogSectionCard key={blog._id} data={blog} />
							))}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default UserProfile;
