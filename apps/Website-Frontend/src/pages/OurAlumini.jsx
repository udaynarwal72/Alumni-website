import AlumniCard from "../components/AlumniCard/AlumniCard";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import "../styles/OurAlumni.css";
const alumniData = [
	{
		name: "Pragati Bhargava",
		batch: "1988-92",
		designation: "Associate manager",
		company: "Zomato",
		location: "Delhi",
		image: "path/to/image.jpg", // Replace with the actual image path
	},
	// Add more alumni data as needed
];

const OurAlumni = () => {
	return (
		<div>
			<NavBar />
                <div className="Parent">
                    <h1>Alumni</h1>
                    <div className="heading">
                    <div><button>All</button></div>
                    <div><button>Nearby</button></div>
                    <div><button>My Batch</button></div>
                    <div><button>My Branch</button></div>
                    <div><button>My Comapny</button></div>
                    <div><button>My Designation</button></div>
                    </div>
                    <div className="card-holder">
                
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                <AlumniCard />
                </div>
                </div>
                
			<Footer />
		</div>
	);
};

export default OurAlumni;
