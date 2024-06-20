import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer"; // Assuming the correct file name is 'Footer'
import Cookies from "js-cookie";
import "../../styles/UserProfilepage.css";
import BlogSectionCard from "../../components/Blog-section-card/BlogSectionCard";

const UserProfile = () => {
	const { userId } = useParams();
	const [user, setUser] = useState({});
	const [userBlog, setUserBlog] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
			try {
				const userToken = localStorage.getItem("token");
				const response = await axios.get(`http://localhost:3000/api/v1/user/profilesection`, {
					headers: {
						'Authorization': `Bearer ${userToken}`
					}
				});
				setUser(response.data.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
				setError("Failed to fetch user data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	useEffect(() => {
		const fetchUserBlogs = async () => {
			setLoading(true);
			try {
				const userToken = Cookies.get('user-accessToken');
				const response = await axios.get(`http://localhost:3000/api/v1/blog/author/${userId}`, {
					headers: {
						'Authorization': `Bearer ${userToken}`
					}
				});
				setUserBlog(response.data.data);
				console.log(response.data.data)
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
		console.log("blog data", userBlog);
	})
	const createBlog = () => {
		// Use React Router's Link for internal navigation
		// You need to define the route in your routing setup
		// Example: <Link to="/createblog">Post Blog</Link>
		window.location.href = "/createblog";
	};

	const completeProfile = () => {
		// Use React Router's Link for internal navigation
		// You need to define the route in your routing setup
		// Example: <Link to="/completeprofile">Complete Profile</Link>
		window.location.href = "/completeprofile";
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<NavBar />
			<div className="parent-user">
				<div className="upper-section">
					<div className="profile-card">
						<div className="upper-portion">
							<div className="profile-pic">
								<img src={user.avatar} alt="Profile Pic" />
							</div>
							<div className="user-name">
								<div>{user.first_name} {user.last_name}</div>
								<span style={{ fontWeight: "bold" }}>{user.organisation}</span>
							</div>
							<div className="edit-button">
								<button onClick={createBlog}>Post Blog</button>
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
								<div className="user-phone">
									<div className="loco-logo">
										<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg" alt="Logo" />
									</div>
									<div>{user.phone_number}</div>
								</div>
								<div className="user-loco">
									<div className="loco-logo">
										<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg" alt="Logo" />
									</div>
									<div>{user.city}</div>
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
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s" alt="LinkedIn" />
									</a>
								</div>
								<div>Instagram</div>
							</div>
						</div>
						<div className="unique-link">
							<div className="link1">
								<div className="link-logo">
									<a href="mailto:example@gmail.com">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6qGmoUH55tCoXEvccuBA09KNqL9n5pSupnQ&s" alt="Gmail" />
									</a>
								</div>
								<div>Gmail</div>
							</div>
							<div className="link2">
								<div className="link-logo">
									<a href="https://www.facebook.com">
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
								<div><h1>Personal Info</h1></div>
							</div>
							<div className="edit-button-2">
								<button>Edit</button>
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
								<div><h4>{user.city}</h4></div>
							</div>
							<div className="inner">
								<div><h3>Location:</h3></div>
								<div><h4>{user.city}</h4></div>
							</div>
						</div>
					</div>
					<div className="profile-recent">
						<h1>Recent Posts</h1>
						<div className="recent-blogs">
							{userBlog.map((index, blog) => (
								<BlogSectionCard key={index._id} data={index} />
								// <div className="blog-card">
								// 	<div className="blog-image">
								// 		<img src={index.blogImage} alt="Blog" />
								// 	</div>
								// 	<div className="blog-title">
								// 		<h3>{index.blog_title}</h3>
								// 	</div>
								// 	<div className="blog-content">
								// 		<p>{index.blog_body}</p>
								// 	</div>
								// 	<div className="blog-author">
								// 		<h4>{index.blog_createdBy.username}</h4>
								// 	</div>
								// </div>
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
