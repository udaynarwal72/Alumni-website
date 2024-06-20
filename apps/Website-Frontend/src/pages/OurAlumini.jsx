import React, { useState, useEffect } from "react";
import axios from "axios";
import AlumniCard from "../components/AlumniCard/AlumniCard";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";
import "../styles/OurAlumni.css";

const branches = [
	"Computer Science",
	"Electronics and Communication Engineering",
	"Information Technology",
	"Mechanical Engineering",
	"Electrical Engineering",
	"Civil Engineering",
	"Production and Industrial Engineering",
	"Mathematics and Computing",
	"Industrial Internet of Things",
	"Other",
];
const batches = [
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020
];


const OurAlumni = () => {
	const [alumni, setAlumni] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const alumniPerPage = 20;
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchAlumni = async () => {
			try {
				console.log("Fetching alumni data...");
				const response = await axios.get(
					"http://localhost:3000/api/v1/user/findalumni"
				);
				if (Array.isArray(response.data.data)) {
					setAlumni(response.data.data);
				} else {
					console.error("Unexpected response format:", response.data);
				}
				console.log(response.data.data);
			} catch (error) {
				console.error("Error fetching alumni data:", error);
			}
		};
		fetchAlumni();
	}, []);

	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber);

	// Search functionality
	const handleSearch = e => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	const handleSearchSubmit = e => {
		e.preventDefault();
	};

	const filteredAlumni = alumni.filter(
		alumniItem =>
			alumniItem.username.toLowerCase().includes(searchTerm) ||
			alumniItem.branch.toLowerCase().includes(searchTerm) ||
			alumniItem.first_name.toLowerCase().includes(searchTerm) ||
			alumniItem.last_name.toLowerCase().includes(searchTerm)
	);

	// Calculate the indexes for the current page
	const indexOfLastAlumni = currentPage * alumniPerPage;
	const indexOfFirstAlumni = indexOfLastAlumni - alumniPerPage;
	const currentAlumni = filteredAlumni.slice(
		indexOfFirstAlumni,
		indexOfLastAlumni
	);

	// Placeholder functions for button clicks
	const allAlumni = () => {
		window.location.href = "/alumnisection";
	};

	const branchAlumni = () => {
		// Implement branch alumni filtering logic
	};

	const branchFilter = () => {
		// Implement branch filter logic
	};

	const companyFilter = () => {
		// Implement company filter logic
	};
	return (
		<div>
			<NavBar />
			<div className="Parent">
				<h1>Alumni</h1>
				<div className="heading">
					<div className="left-head">
						<div>
							<button onClick={allAlumni}>All</button>
						</div>
						<div>
							<select
								id="branch"
								name="branch"
								className="branch-drop"
								required
							>
								<option value="">Select Branch</option>
								{branches.map(branch => (
									<option key={branch} value={branch}>
										{branch}
									</option>
								))}
							</select>
						</div>
						<div>
							<select id="batch" name="batch" className="batch-drop" required>
								<option value="">Select Batch</option>
								{batches.map(batch => (
									<option key={batch} value={batch}>
										{batch}
									</option>
								))}
							</select>
						</div>
					</div>
					{/* <div><button>Nearby</button></div> */}
					{/* <div><button onClick={branchAlumni}>My Batch</button></div> */}
					{/* <div><button onClick={branchFilter}>My Branch</button></div> */}
					{/* <label htmlFor="branch">Branch</label> */}

					{/* <div><button onClick={companyFilter}>My Company</button></div> */}
					{/* <div><button>My Designation</button></div> */}
					<div className="side-search">
						<form onSubmit={handleSearchSubmit}>
							<input
								type="text"
								name="search-term"
								onChange={handleSearch}
								className="text-input-blog-search"
								placeholder="Search..."
							/>
						</form>
					</div>
				</div>
				<div className="card-holder">
					{currentAlumni.map(alumniItem => (
						<AlumniCard key={alumniItem._id} AlumniData={alumniItem} />
					))}
				</div>
				<div className="pagination">
					{Array.from(
						{ length: Math.ceil(alumni.length / alumniPerPage) },
						(_, index) => (
							<button key={index + 1} onClick={() => paginate(index + 1)}>
								{index + 1}
							</button>
						)
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default OurAlumni;
