import React, { useState } from "react";
import "./NavBar.css"; // Importing CSS file for styling
import { NavLink } from "react-router-dom";

const NavBar = () => {
	const [showNavbar, setShowNavbar] = useState(false);

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};
	// const [menuOpen, setMenuOpen] = useState(false);
	// const [dropdownOpen, setDropdownOpen] = useState(false);

	// const handleMenuToggle = () => {
	//   setMenuOpen(!menuOpen);
	// };

	// const handleProfileToggle = () => {
	//   setDropdownOpen(!dropdownOpen);
	// };

	// const isSignedIn = false;

	return (
		// <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
		//   <div className="logo">
		//     <a href="/">LOGO</a>
		//   </div>
		//   <div className="menu-container">
		//     <ul className="nav-links">
		//       <li><a href="/">Home</a></li>
		//       <li><a href="about">About Us</a></li>
		//       <li><a href="contactus">Contact Us</a></li>
		//       <li><a href="hire">Hire</a></li>
		//     </ul>
		//     <div className="search-bar">
		//       <input type="text" placeholder="Search..." />
		//       <button type="submit">
		//         <img src="https://img.icons8.com/material-outlined/24/000000/search.png" alt="search" />
		//       </button>
		//     </div>
		//     <div className="profile-section" onClick={handleProfileToggle}>
		//       <img src="https://img.icons8.com/material-outlined/24/000000/user.png" alt="profile" />
		//       {dropdownOpen && (
		//         <div className="dropdown-menu">
		//           {isSignedIn ? (
		//             <>
		//               <a href="#profile">Profile</a>
		//               <a href="#notifications">Notifications</a>
		//               <a href="#logout">Log out</a>
		//             </>
		//           ) : (
		//             <>
		//               <a href="/login">Log in</a>
		//               <a href="/signup">Sign up</a>
		//             </>
		//           )}
		//         </div>
		//       )}

		//     </div>
		//     <div className="hamburger-menu" onClick={handleMenuToggle}>
		//       <span></span>
		//       <span></span>
		//       <span></span>
		//     </div>
		//   </div>
		// </nav>
		<nav className="navbar">
			<div className="nav-container">
				<div className="logo">
					<img src="	https://casepl.in/wp-content/uploads/2024/05/reck-logo-in-white-colour-120x93.png"></img>
				</div>
				<div className="menu-icon" onClick={handleShowNavbar}>
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkNEBO2OUKQjP-RSbIZae3jIq76g3rMrn9vQ&s"></img>
				</div>
				<div className={`nav-elements ${showNavbar ? "active" : ""}`}>
					<ul>
						<li>
							<a href="">Home</a>
						</li>
						<li>
							<a href="">Blog</a>
						</li>
						<li>
							<a href="">Projects</a>
						</li>
						<li>
							<a href="">About</a>
						</li>
						<li>
							<a href="">Contact</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
