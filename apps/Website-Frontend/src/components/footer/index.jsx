import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="logo">
              <img src="/logo.svg" alt="Logo" />
              <h2>LOGO</h2>
              <p>Illuminate Your Brilliance: Showcase Your Talent</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="quick-links">
              <h3>Quick Link</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/menu">Menu</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="opening-hours">
              <h3>Opening Hours</h3>
              <div className="hours">
                <i className="far fa-clock"></i>
                <p>Sunday to Wednesday</p>
                <p>9AM - 10.30PM</p>
              </div>
              <div className="hours">
                <i className="far fa-clock"></i>
                <p>Thursday, Friday, Saturday</p>
                <p>9AM - 12.30AM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="copyright">
              <p>Copyright © 2024 Mehfil</p>
              <p>Powered by Mehfil</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;