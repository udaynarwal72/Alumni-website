import React from "react";
import "./BirthdayCard.css";

const BirthdayCard = () => {
	return (
		<>
			<div className="parent-birth">
				<div className="birth-card">
					<div className="birth-head">
						<div className="happy">
							<h2>Happy</h2>
						</div>
						<div className="birthday">
							<h1>Birthday</h1>
						</div>
					</div>
          <div className="birth-middle">
            <div className="birth-image">
              <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"></img>
            </div>
          </div>
          <div className="birth-last">
            <div className="birth-list"> 
              <ul className="info-list">
                <li><div><h3>Uday Narwal</h3></div></li>
                <li><div><h3>Associate Manager</h3></div></li>
                <li><div><h3>Microsoft</h3></div></li>
              </ul>
            </div>
          </div>

					<div></div>
				</div>
			</div>
		</>
	);
};

export default BirthdayCard;
