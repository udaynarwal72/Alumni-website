import React from "react";
import "./Footer.css"; // Importing CSS file for styling

const Footer = () => {
	return (
		<footer className="home-footer">
			{/* <div className="footer-logo">
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
      </div> */}
			<div className="footer-row">
				<div className="footer-col">
					<img src="https://casepl.in/wp-content/uploads/2024/05/reck-logo-in-white-colour.png"></img>
					<div className="footer-para">
						Illuminate Your Brilliance: Showcase Your Talent
					</div>
				</div>
				<div className="footer-col">
					<h3>Our Location <div className="underline"><span></span></div></h3>
					<p>3 E 19th St, 123 Fifth Avenue,</p>
					<p>NY 10160, New York, USA</p>
					<p>1 234 567 890</p>
					<p className="footer-email-id">abcd@klmn.yah.com</p>
				</div>
				<div className="footer-col">
					<h3>Quick Links<div className="underline"><span></span></div></h3>
					<ul>
						<li>
							<a href=""></a>Home
						</li>
						<li>
							<a href=""></a>About Us
						</li>
						<li>
							<a href=""></a>Events
						</li>
						<li>
							<a href=""></a>Our Blogs
						</li>
						<li>
							<a href=""></a>Contact us
						</li>
					</ul>
				</div>
				<div className="footer-col">
					<h3>Opening Hours<div className="underline"><span></span></div></h3>
					<div className="opening">
						<span>Sunday to Wednesday</span>
						<span>9AM-10:30PM</span>
					</div>
					<div className="opening">
						<span>Thursday to Friday</span>
						<span>9AM To 12:30PM</span>
					</div>
				</div>
			</div>
      <hr className="copy" ></hr>
      <p className="copyright">Copyright © 2024 Mehfil</p>
		</footer>
	);
};

export default Footer;
