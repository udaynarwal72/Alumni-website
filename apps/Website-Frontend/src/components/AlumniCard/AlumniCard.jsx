import React, { useEffect, useRef } from "react";
import "./AlumniCard.css";
import { useNavigate } from "react-router";

const AlumniCard = ({ AlumniData }) => {
	const nameRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const adjustFontSize = () => {
			const nameElement = nameRef.current;
			if (nameElement) {
				const parentElement = nameElement.parentElement;
				// Reset font size before recalculating
				nameElement.style.fontSize = "1.25rem";
				// Adjust font size if necessary
				while (nameElement.scrollWidth > parentElement.clientWidth) {
					const currentFontSize = parseFloat(
						window.getComputedStyle(nameElement).fontSize
					);
					nameElement.style.fontSize = currentFontSize - 1 + "px";
				}
			}
		};

		adjustFontSize(); // Call initially
		window.addEventListener("resize", adjustFontSize); // Call on window resize

		return () => {
			window.removeEventListener("resize", adjustFontSize); // Clean up listener on unmount
		};
	}, []); // Empty dependency array ensures effect runs only once after initial render
	const redirectToAlumniPage = () => {
		navigate(`/infoalumni/${AlumniData._id}`)
	}
	return (
		// <div onClick={redirectToAlumniPage}>
				<div className=" card border rounded-lg">
					<div className="card-header" >
						<img
							src={AlumniData.avatar}
							className="profile-image "
							alt="Profile"
						/>
					</div>
					<div className="card-name">
						<h2 className="card-name font-dmsans" >
							{AlumniData.first_name} {AlumniData.last_name}
						</h2>
					</div>
					<div className="details">
						<div className="head1">
							<div>
								<div className="Batch font-dmsans">Joining Batch</div>
								<div>
									{AlumniData.joining_batch}
								</div>
							</div>
							<div>
								<div className="Batch font-dmsans">Location</div>
								<div>{AlumniData.state}</div>
							</div>
						</div>
						<div className="head1">
							<div>
								<div className="Batch font-dmsans">Company</div>
								<div>{AlumniData.organisation}</div>
							</div>
						</div>
						<div className="head1">
							<div>
								<div className="Batch font-dmsans">Designation</div>
								<div>{AlumniData.designation}</div>
							</div>
						</div>
					</div>
				</div>
		// </div>
	);
};

export default AlumniCard;
