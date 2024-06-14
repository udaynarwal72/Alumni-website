import "./JobCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const JobCard = () => {
	return (
		<div className="job-card-parent">
			<div className="main-job-card">
				<div className="job-card-header">
					<h1>Zomato</h1>
					<p>Prateek</p>
				</div>
				<div className="second">
					<div className="ux-designer">UX Designer</div>
					<div className="time-posted">5 hours ago</div>
				</div>

				<div className="job-card-details">
					<div className="row1">
						<div className="one-detail">
							<div className="job-logos">
								<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
							</div>
							<div> 3-5 Years</div>
						</div>
						<div className="second-detail">
							<div className="job-logos">
								<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
							</div>
							<div>New Delhi</div>
						</div>
					</div>

					<div className="row2">
						<div className="one-detail">
							<div className="job-logos">
								<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
							</div>
							<div>Hybrid</div>
						</div>
						<div className="second-detail">
							<div className="job-logos">
								<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
							</div>
							<div>3 Openings</div>
						</div>
					</div>
				</div>
				<div className="skills">
					<span>Figma</span>
					<span>Wireframing</span>
					<span>Prototyping</span>
				</div>
				<a className="apply-link" href="https://www.travezco.com/about">
					<span>Apply-</span> https://www.travezco.com/about
				</a>
			</div>
		</div>
	);
};

export default JobCard;
