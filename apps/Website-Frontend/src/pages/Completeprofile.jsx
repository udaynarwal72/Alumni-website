import NavBar from "../components/Navbar";
import React, { useState } from 'react';
import Footer from "../components/footer";
import "../styles/Completeprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Completeprofile = () => {
	return (
		<>
			<NavBar />
			<div className="parent-comp-prof">
				<div className="form-struct">
					<form className="complete-prof">
						<div className="header-row">
							<h1>Additional Details</h1>
						</div>
						<div className="comp-form-section">
							<div>
								<label>Current City:</label>
								<input type="text" name="city" className="in" />
							</div>
							<div>
								<label>State:</label>
								<input type="text" name="state" className="in" />
							</div>
							<div>
								<label>Country:</label>
								<input type="text" name="country" className="in" />
							</div>
						</div>
                        <div className="comp-form-section">
							<div>
								<label>Linkedin Profile:</label>
								<input type="text" name="city" className="in" required/>
							</div>
							<div>
								<label>Instagram Profile:</label>
								<input type="text" name="state" className="in" />
							</div>
							<div>
								<label>Twitter Profile:</label>
								<input type="text" name="country" className="in" />
							</div>
						</div>
						<div className="form-section">
							<div>
								<label>Achievements:</label>
								<textarea name="achievements" />
							</div>
							<div>
								<label>Hobbies:</label>

								<div>
									<input type="text" className="in" />
								</div>

								
							</div>
						</div>
						<div className="plus">
                            <div>
                            <button
							className="icon-button"
							type="button"
							
						>
							<FontAwesomeIcon icon={faPlus} />
						</button>
                            </div>
                       
                        </div>
						
						
							<div className="new-fields">
								<div>
									<label>Field Name:</label>
									<input
										type="text"
										name="heading"
										className="in"
									/>
								</div>
								<div>
									<label>Description:</label>
									<textarea
										name="description"
										
									/>
								</div>
							</div>
                            <div className="cen">
                                <div>
                                <button type="submit" className="prof-subm">
							Submit
						</button>
                                </div>
                            
                            </div>
                            
					</form>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Completeprofile;
