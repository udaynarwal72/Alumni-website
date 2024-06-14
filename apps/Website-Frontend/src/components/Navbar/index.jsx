import React, { useState } from "react";
import "./NavBar.css"; // Importing CSS file for styling
import { NavLink } from "react-router-dom";
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas, faTwitter, faFontAwesome)

const NavBar = () => {
	const [showNavbar, setShowNavbar] = useState(false);

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};
	return (
		<nav className="navbar">
			<div className="nav-container">
				<div className="logo">
					<img src="	https://casepl.in/wp-content/uploads/2024/05/reck-logo-in-white-colour-120x93.png"></img>
				</div>
				<div className="menu-icon" onClick={handleShowNavbar}>
					<FontAwesomeIcon icon="fa-solid fa-bars" style={{color: "#ffffff",}} size="2xl"/>
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
