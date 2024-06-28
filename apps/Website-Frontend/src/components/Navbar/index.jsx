// src/components/NavBar.js

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { authState, checkAuthSelector } from '../../Recoil/Authuser';

library.add(fas);

const NavBar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authState);
    const authStatus = useRecoilValueLoadable(checkAuthSelector);

    useEffect(() => {
        if (authStatus.state === 'hasValue') {
            setAuth(authStatus.contents);
        }
    }, [authStatus.state, authStatus.contents, setAuth]);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    const redirectProfile = (e) => {
        e.preventDefault();
        if (auth.user) {
            navigate(`/user/${auth.user._id}`);
        }
    };

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
                        <li><NavLink to="/blogsection" activeClassName="active-link">Blog</NavLink></li>
                        <li><NavLink to="/about" activeClassName="active-link">About</NavLink></li>
                        <li><NavLink to="/contactus" activeClassName="active-link">Contact</NavLink></li>
                        {auth.isLoading ? (
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 m-5 mb-4"></div>
                        ) : auth.isLoggedIn ? (
                            <>
                                <li><NavLink to="/logout">Logout</NavLink></li>
                                <li><NavLink to="#" onClick={redirectProfile}>Hello, {auth.user?.first_name}</NavLink></li>
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
