import "../styles/UserProfilepage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
// const UserProfile = () => {
//   console.log('UserProfile component');
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         // const cookies = getCookies
//         const header = localStorage.getItem("token")
//         const response = await axios.get('http://localhost:3000/api/v1/user/profilesection', { headers: { "Authorization": `Bearer ${header}` } });
//         setUser(response.data.data);
//       } catch (err) {
//         console.error('Error fetching user details:', err);
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//   fetchUserDetails();
// }, []); // Added dependency array here

// if (loading) return <div>Loading...</div>;
// if (error) return <div>Error loading user details: {error.message}</div>;

//   return (
//     <div>
//       <h1>User Profile</h1>
//       {user && (
//         <div>
//           <p>Name: {user.first_name} {user.last_name}</p>
//           <p>Email: {user.email}</p>
//           <p>Branch: {user.branch}</p>
//           <p>City: {user.city}</p>
//           <p>Country: {user.country}</p>
//           <p>Organisation: {user.organisation}</p>
//           <p>Phone Number: {user.phone_number}</p>
//           {/* Add other user details here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

const UserProfile = () => {
	return (
		//       <div className="page-container">
		//         <div className="header">
		//           <img className="cover-photo" src="https://via.placeholder.com/850x200" alt="Cover Photo" />
		//           <img className="profile-picture" src="https://via.placeholder.com/150" alt="Profile Picture" />
		//           <div className="user-info">
		//             <h1 className="name">John Doe</h1>
		//             <p className="bio">Web Developer | Tech Enthusiast | Blogger</p>
		//           </div>
		//         </div>
		//         <div className="content">
		//           <div className="section about">
		//             <h2>About</h2>
		//             <p>This is a sample user profile section built with React and CSS.</p>
		//           </div>
		//           <div className="section contact">
		//             <h2>Contact Information</h2>
		//             <p>Email: john.doe@example.com</p>
		//             <p>Phone: (123) 456-7890</p>
		//             <p>Location: San Francisco, CA</p>
		//           </div>
		//           <div className="section skills">
		//             <h2>Skills</h2>
		//             <ul>
		//               <li>JavaScript</li>
		//               <li>React</li>
		//               <li>CSS</li>
		//               <li>Node.js</li>
		//             </ul>
		//           </div>
		//           <div className="section posts">
		//             <h2>Posts</h2>
		//             <div className="post">
		//               <h3>First Post</h3>
		//               <p>This is an example of a user post.</p>
		//             </div>
		//             <div className="post">
		//               <h3>Second Post</h3>
		//               <p>Another example of a user post.</p>
		//             </div>
		//           </div>
		//         </div>
		//       </div>
    <>
    <NavBar />
		<div className="parent-user">
      <div className="upper-section">
        <div className="profile-card">
          <div className="upper-portion">
            <div className="profile-pic">
              <img src="https://www.livemint.com/lm-img/img/2024/03/09/600x338/Arun_1710003564599_1710003566744.jpg"></img>
            </div>
          </div>
          <div className="lower-portion">
            Hello
          </div>
        </div>
        <div className="profile-links"></div>
      </div>
    </div>
    <Footer />
    </>
	);
};

export default UserProfile;
