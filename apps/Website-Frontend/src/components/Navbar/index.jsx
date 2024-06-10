import React, { useState } from 'react';
import './NavBar.css';  // Importing CSS file for styling

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isSignedIn = false;

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      <div className="logo">
        <a href="/">LOGO</a>
      </div>
      <div className="menu-container">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li><a href="contactus">Contact Us</a></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">
            <img src="https://img.icons8.com/material-outlined/24/000000/search.png" alt="search" />
          </button>
        </div>
        <div className="profile-section" onClick={handleProfileToggle}>
          <img src="https://img.icons8.com/material-outlined/24/000000/user.png" alt="profile" />
          {dropdownOpen && (
            <div className="dropdown-menu">
              {isSignedIn ? (
                <>
                  <a href="#profile">Profile</a>
                  <a href="#notifications">Notifications</a>
                  <a href="#logout">Log out</a>
                </>
              ) : (
                <>
                  <a href="/login">Log in</a>
                  <a href="/signup">Sign up</a>
                </>
              )}
            </div>
          )}

        </div>
        <div className="hamburger-menu" onClick={handleMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
