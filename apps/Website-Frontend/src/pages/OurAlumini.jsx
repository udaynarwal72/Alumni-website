import AlumniCard from '../components/AlumniCard/AlumniCard';
import NavBar from '../components/Navbar';
import Footer from '../components/footer';
import '../styles/OurAlumni.css';

const OurAlumni = () => {
    return (
        <div>
            <NavBar />
            <div className="parent-ourAlumni">
                <h1>Our Alumni</h1>
                <p>Our Alumni page content</p>
                <AlumniCard />
            </div>
            <Footer />
        </div>
    );
};

export default OurAlumni;