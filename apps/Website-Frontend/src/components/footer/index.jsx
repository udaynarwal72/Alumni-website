import React from 'react';
import './Footer.css'; // Importing CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="https://via.placeholder.com/100x100" alt="Logo" />
      </div>
      <div className="footer-location">
        <h3>Our Location</h3>
        <p>NIT Kurukshetra</p>
        <p>Kurukshetra, Haryana, India - 136119</p>
      </div>
      <div className="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">About Us</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
