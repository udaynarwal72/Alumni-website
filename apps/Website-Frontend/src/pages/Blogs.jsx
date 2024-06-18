import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import "../styles/Blogs.css";

const Blogs = () => {
	const { blogId } = useParams();
	const [blogData, setBlogData] = useState({});
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchBlogData = async () => {
			try {
				const blogResponse = await axios.get(`http://localhost:3000/api/v1/blog/single/${blogId}`);
				const userData = await axios.get(`http://localhost:3000/api/v1/user/getuserbyid/${blogResponse.data.data.blog_createdBy}`);

				console.log("User data:", userData.data.data.username); // Debug user data

				if (blogResponse.data && blogResponse.data.data) {
					setBlogData(blogResponse.data.data);
					setUser(userData.data.data);
				} else {
					console.error("Unexpected response format:", blogResponse.data);
				}
			} catch (error) {
				console.error('Error fetching blog data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchBlogData();
	}, [blogId]);

	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div>
			<NavBar />
			<div className="Parent-blog">
				<div className="root">
					<div className="content">
						<div>
							<h1>{blogData.blog_title}</h1>
						</div>
						<div className="header">
							<div className="profile">
								<div className="image">
									<img src="https://miro.medium.com/v2/resize:fill:55:55/1*7l1EOKCS6EEzIAmGbUWsxg.jpeg" alt="User profile" />
								</div>
								<div className="info">
									<div>
										<span style={{ fontWeight: "bold" }}>@{user.username}</span>
									</div>
									<div>
										<span>{formatDate(blogData.createdAt)}</span>
									</div>
								</div>
							</div>
						</div>
						<div className="image-big">
							<img src={blogData.blogImage} alt="Blog cover" />
						</div>
						<div className="para">
							{blogData.blog_body}
						</div>
						<div className="buttons">
							{blogData.blog_tags && blogData.blog_tags.map((tag, index) => (
								<div key={index}>
									<button>{tag}</button>
								</div>
							))}
						</div>
						<div className="icons">
							<div className="left">
								<button>
									<img src="https://via.placeholder.com/150" alt="Placeholder icon" />
								</button>
								<button>
									<img src="https://via.placeholder.com/150" alt="Placeholder icon" />
								</button>
							</div>
							<div className="right">
								<button>
									<img src="https://via.placeholder.com/150" alt="Placeholder icon" />
								</button>
								<button>
									<img src="https://via.placeholder.com/150" alt="Placeholder icon" />
								</button>
								<button>
									<img src="https://via.placeholder.com/150" alt="Placeholder icon" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Blogs;
