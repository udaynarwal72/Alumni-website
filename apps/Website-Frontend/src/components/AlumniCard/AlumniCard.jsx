import React, { useEffect, useRef } from "react";
import "./AlumniCard.css";

const AlumniCard = ({ AlumniData }) => {
	const nameRef = useRef(null);

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

	return (
		<div className="Parent">
			<div className="card">
				<div className="card-header">
					<img
						src={AlumniData.avatar}
						className="profile-image"
						alt="Profile"
					/>
				</div>
				<div className="name">
					<h1 ref={nameRef}>
						{AlumniData.first_name} {AlumniData.last_name}
					</h1>
				</div>
				<div className="details">
					<div className="head1">
						<div>
                            <div>Batch</div>
							
							<div>
								{AlumniData.joining_batch}-
								{Number(AlumniData.joining_batch) + 4}
							</div>
						</div>
						<div>
							<div>Location</div>
							<div>{AlumniData.state}</div>
                            
						</div>
					</div>
					<div className="head1">
						<div>
							<div>Company</div>
							<div>{AlumniData.organisation}</div>
						</div>
					</div>
                    <div className="head1">
                    <div>
							<div>Designation</div>
							<div>{AlumniData.designation}</div>
						</div>
                    </div>
					
						
					
				</div>
			</div>
		</div>
	);
};

export default AlumniCard;
