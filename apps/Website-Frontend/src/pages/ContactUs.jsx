import React from 'react';

import '../styles/ContactUsPage.css'; // Importing CSS file for styling
import NavBar from '../components/Navbar';
import Footer from '../components/footer';

const ContactUsPage = () => {
  return (
    <div className="contact-us-page">
        <NavBar/>
      <main>
        <section className="contact-info">
          <h1>Contact Us</h1>
          <div className="info">
            <div className="info-item">
              <h2>Address</h2>
              <p>NIT Kurukshetra</p>
              <p>Kurukshetra, Haryana, India - 136119</p>
            </div>
            <div className="info-item">
              <h2>Email</h2>
              <p>info@nitkkralumni.com</p>
            </div>
            <div className="info-item">
              <h2>Phone</h2>
              <p>+91 1234567890</p>
            </div>
          </div>
        </section>
        <section className="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </section>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default ContactUsPage;
