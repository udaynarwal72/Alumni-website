import "../styles/UserProfilepage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import Cookies from "js-cookie";
import BlogSectionCard from "../components/Blog-section-card/BlogSectionCard"
const UserProfile = () => {
	const params = useParams();
	const [user, setUser] = useState({});
	const { userId } = params;
	useEffect(() => {
		const fetchingUserName = async (userSpecialId) => {
			try {
				const userSpecialId = Cookies.get('user-accessToken');
				const response = await axios.get('http://localhost:3000/api/v1/user/profilesection', {
					headers: {
						'Authorization': `Bearer ${userSpecialId}`
					}
				});
				setUser(response.data.data);
			} catch (error) {
				console.error("Error fetching user name:", error);
			}
		}
		fetchingUserName();
	}, [])
	const createBlog = () => {
		window.location.href = "/createblog";
	}
	const completeProfile = () => {	
		window.location.href = "/completeprofile";
	}
	return (
		<>
			<NavBar />
			<div className="parent-user">
				<div className="upper-section">
					<div className="profile-card">
						<div className="upper-portion">
							<div className="upper-left">
								<div className="profile-pic">
									<img src={user.avatar}></img>
								</div>
								<div className="user-name">
									<div>{user.first_name} {user.last_name}</div>
									<span>{user.designation}</span>
								</div>
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
										<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
									</div>
									<div>{user.email} </div>
								</div>
								<div className="user-phone">
									<div className="loco-logo">
										<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
									</div>
									<div>{user.phone_number}</div>
								</div>
								<div className="user-loco">
									<div className="loco-logo">
										<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
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
									<a href="">
										<img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"></img>
									</a>
								</div>
								<div>Linkedin</div>
							</div>
							<div className="link2">
								<div className="link-logo">
									<a href="">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s"></img>
									</a>
								</div>
								<div>Linkedin</div>
							</div>
						</div>
						<div className="unique-link">
							<div className="link1">
								<div className="link-logo">
									<a href="">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6qGmoUH55tCoXEvccuBA09KNqL9n5pSupnQ&s"></img>
									</a>
								</div>
								<div>Gmail</div>
							</div>
							<div className="link2">
								<div className="link-logo">
									<a href="">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjvzC_QRv6moAhgNb5C6e3yicKgFND1g2RwA&s"></img>
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
							<div><h3>Name:</h3></div>
							<div><h4>Uday Singh</h4></div>
								
								
							</div>
							<div className="inner">
							<div><h3>Batch:</h3></div>
							<div><h4>1994-1998</h4></div>
								
							</div>
							<div className="inner">
							<div><h3>Branch:</h3></div>
							<div><h4>Computer Engineering</h4></div>
								
							</div>
							<div className="inner">
								<div><h3>Location</h3></div>
								<div><h4>Bengaluru</h4></div>
								
							</div>
						</div>
					</div>
					<div className="profile-recent">
						<h1>Recent Posts</h1>
						
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default UserProfile;
