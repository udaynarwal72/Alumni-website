import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import "../styles/Blogs.css";

const Blogs = () => {
	const { blogId } = useParams();
	const [blogData, setBlogData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBlogData = async () => {
			try {
				const blogResponse = await axios.get(`http://localhost:3000/api/v1/blog/single/${blogId}`);
				
				if (blogResponse.data && blogResponse.data.data) {
					setBlogData(blogResponse.data.data);
				} else {
					console.error("Unexpected response format:", blogResponse.data);
				}
			} catch (error) {
				console.error("Error fetching blog data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchBlogData();
	}, [blogId]);

	const formatDate = dateString => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

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
									<img src={blogData.blog_createdBy.avatar} alt="User profile" />
								</div>
								<div className="info">
									<div>
										<span style={{ fontWeight: "bold" }}>@{blogData.blog_createdBy.username}</span>
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
						<div className="para">{blogData.blog_body}</div>
						<div className="buttons">
							{blogData.blog_tags &&
								blogData.blog_tags.map((tag, index) => (
									<div key={index}>
										<button>{tag}</button>
									</div>
								))}
						</div>
						<div className="icons">
							<div className="left">
								<button>
									<img
										src="data:image/png;base64,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"
										alt="Placeholder icon"
									/>
								</button>
								<span>123</span>
								<button>
									<img
										src="data:image/png;base64,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"
										alt="Placeholder icon"
									/>
									
								</button>
								<span>123</span>
							</div>
							<div className="right">
								<button>
									<img
										src="https://via.placeholder.com/150"
										alt="Placeholder icon"
									/>
								</button>
								<button>
									<img
										src="https://via.placeholder.com/150"
										alt="Placeholder icon"
									/>
								</button>
								<button>
									<img
										src="https://via.placeholder.com/150"
										alt="Placeholder icon"
									/>
								</button>
							</div>
						</div>
						<div className="comm">
							<div className="comments">
								<div className="responses">
									<h1 className="responses">Responses(5)</h1>
								</div>
								<div>
									<input
										type="text"
										placeholder="What are you thoughts?"
										id="res"
									></input>
								</div>
								<div className="submit-button">
								<div ><button>Submit</button></div>
								</div>
								
								<div>
									<h3>Previous comments</h3>
								</div>
								<div className="comment-column">
									<div className="user-comment">
										<div className="comm-image">
											<img src=""></img>
										</div>
										<div className="comm-desc">
											<div>
												<span>Johnson</span>
												<span>3 month ago</span>
											</div>
										</div>
									</div>
									<div className="comment-body">More updates pls</div>
								</div>
								<div className="comment-column">
									<div className="user-comment">
										<div className="comm-image">
											<img src=""></img>
										</div>
										<div className="comm-desc">
											<div>
												<span>Johnson</span>
												<span>3 month ago</span>
											</div>
										</div>
									</div>
									<div className="comment-body">More updates pls</div>
								</div>
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
