import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import { useParams } from 'react-router-dom';
import Footer from "../components/footer";
import axios from 'axios';
import "../styles/Blogs.css";

const Blogs = () => {
    const { blogId } = useParams();
    const [blogData, setBlogData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBlogData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/blog/single/${blogId}`);
                if (response.data && response.data.data) {
                    setBlogData(response.data.data);
					console.log("API Response:", response.data.data); // Debug the API response
                } else {
                    console.error("Unexpected response format:", response.data);
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setLoading(false);
            }
        };
        getBlogData();
    }, [blogId]);

	return (
		<div>
			<NavBar />
			<div class="Parent-blog">
				<div className="root">
					<div className="content">
						<div>
							<h1>{blogData.blog_title}</h1>
						</div>
						<div className="header">
							<div className="profile">
								<div className="image">
									<img src="	https://miro.medium.com/v2/resize:fill:55:55/1*7l1EOKCS6EEzIAmGbUWsxg.jpeg"></img>
								</div>
								<div className="info">
									<div>
										<span>{blogData.username}</span>
										<span>Follow</span>
									</div>
									<div>
										<span>3 min read</span>
										<span>13 June 2024</span>
									</div>
								</div>
							</div>
							<div className="icons">
								<div className="left">
									<button>
										<img src="https://via.placeholder.com/150"></img>
									</button>
									<button>
										<img src="https://via.placeholder.com/150"></img>
									</button>
								</div>
								<div className="right">
									<button>
										<img src="https://via.placeholder.com/150"></img>
									</button>
									<button>
										<img src="https://via.placeholder.com/150"></img>
									</button>
									<button>
										<img src="https://via.placeholder.com/150"></img>
									</button>
								</div>
							</div>
						</div>
						<div className="image-big">
							<div>
								<img src={blogData.blogImage}></img>
							</div>
						</div>
						<div className="para">
							{blogData.blog_body}
						</div>
						<div className="buttons">
							<div>
								<button>Programming</button>
							</div>
							<div>
								<button>C Sharp</button>
							</div>
							<div>
								<button>Software Development</button>
							</div>
							<div>
								<button>Software Engineering</button>
							</div>
							<div>
								<button>Dotnet</button>
							</div>
						</div>
						<div className="icons">
							<div className="left">
								<button>
									<img src="https://via.placeholder.com/150"></img>
								</button>
								<button>
									<img src="https://via.placeholder.com/150"></img>
								</button>
							</div>
							<div className="right">
								<button>
									<img src="https://via.placeholder.com/150"></img>
								</button>
								<button>
									<img src="https://via.placeholder.com/150"></img>
								</button>
								<button>
									<img src="https://via.placeholder.com/150"></img>
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
