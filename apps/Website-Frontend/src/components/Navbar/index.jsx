import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for HTTP requests
import './NavBar.css'; // Ensure to import your CSS file for styling
import Cookies from 'js-cookie';
library.add(fas);

const NavBar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status
    const [userName, setUserName] = useState("");

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const userSpecialId = Cookies.get('user-accessToken');
                console.log('User Special ID:', userSpecialId);
                const response = await axios.get('http://localhost:3000/api/v1/user/check-auth', {
                    headers: {
                        'Authorization': `Bearer ${userSpecialId}`
                    }
                });
                if (response.data.data.isLoggedIn) {
                    setIsLoggedIn(true); // User is authenticated
                    fetchingUserName(userSpecialId); // Fetch the user's name if authenticated
                } else {
                    setIsLoggedIn(false); // User is not authenticated
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsLoggedIn(false); // Set to false on error
            }
        };

        const fetchingUserName = async (userSpecialId) => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/profilesection', {
                    headers: {
                        'Authorization': `Bearer ${userSpecialId}`
                    }
                });
                console.log('User Name:', response.data.data.username);
                setUserName(response.data.data.first_name);
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        checkAuthentication(); // Call the function to check authentication when component mounts
    }, []); // Empty dependency array means this effect runs only once on mount

    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="/" className="brand">
                    <div className="logo">
                        <img src="https://casepl.in/wp-content/uploads/2024/05/reck-logo-in-white-colour-120x93.png" alt="logo" />
                    </div>
                </a>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <FontAwesomeIcon icon={['fas', 'bars']} style={{ color: "#ffffff" }} size="2x" />
                </div>
                <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
                    <ul>
                        <li><NavLink exact to="/" activeClassName="active-link">Home</NavLink></li>
                        <li><NavLink to="/blog" activeClassName="active-link">Blog</NavLink></li>
                        <li><NavLink to="/projects" activeClassName="active-link">Projects</NavLink></li>
                        <li><NavLink to="/about" activeClassName="active-link">About</NavLink></li>
                        <li><NavLink to="/contactus" activeClassName="active-link">Contact</NavLink></li>
                        {isLoggedIn ? (
                            <>
                                <li><NavLink to="/logout">Logout</NavLink></li>
                                <li><NavLink to="/userprofile">Hello, {userName}</NavLink></li>
                            </>
                        ) : (
                            <>
                                <li><NavLink to="/signin" activeClassName="active-link">Sign In</NavLink></li>
                                <li><NavLink to="/signup" activeClassName="active-link">Sign Up</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
