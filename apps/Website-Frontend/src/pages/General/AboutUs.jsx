import React from 'react';
import '../../styles/AboutUsPage.css';
import NavBar from '../../components/Navbar';
import Footer from '../../components/footer';

const AboutUsPage = () => {
    return (
        <>
            <div className="about-us-page">
                <NavBar />
                <main>
                    <section className="about-section">
                        <h1>About Us</h1>
                        <p>
                             Alumni Association of National Institute of Technology Kurukshetra (NITKKR) is dedicated to fostering a strong bond among its alumni and maintaining a lifelong connection with the institute.
                        </p>
                        <p>
                            Our association aims to:
                        </p>
                        <ul>
                            <li>Facilitate networking among alumni</li>
                            <li>Support the professional development of alumni</li>
                            <li>Contribute to the growth and development of the institute</li>
                        </ul>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed viverra rutrum nisi, ut congue nisl vestibulum sed. Donec in ligula vel mi posuere semper.
                        </p>
                    </section>
                    <section className="mission-section">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to build and sustain a vibrant alumni community that enriches the lives of its members and enhances the reputation of NIT Kurukshetra.
                        </p>
                    </section>
                    <section className="vision-section">
                        <h2>Our Vision</h2>
                        <p>
                            Our vision is to be recognized as a leading alumni association that fosters lifelong connections, supports professional growth, and promotes the values of NIT Kurukshetra.
                        </p>
                    </section>
                    <section className="history-section">
                        <h2>Our History</h2>
                        <p>
                            The Alumni Association of NIT Kurukshetra was founded in [year] with the goal of bringing together graduates from various batches and fostering a sense of camaraderie and collaboration.
                        </p>
                        <p>
                            Over the years, our association has grown in strength and numbers, organizing numerous events, alumni reunions, and initiatives to support the institute and its alumni community.
                        </p>
                    </section>
                </main>
            </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default AboutUsPage;
