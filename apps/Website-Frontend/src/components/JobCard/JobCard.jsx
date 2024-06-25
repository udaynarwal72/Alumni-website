import JobData from "../../../../Website-Backend/src/Schema/JobSchema";
import "./JobCard.css";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const JobCard = ({ data }) => {
	const navigate = useNavigate();
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};
	const redirectToBlog = (e) => {
		navigate(`/jobpage/${data._id}`)
	}
	return (
		<div onClick={(e) => (redirectToBlog(e))}>
			<div className="job-card-parent">
				<div className="main-job-card">
					<div className="all-set">
						<div className="job-card-header">
							<h1>{data.job_company}</h1>
							<p>@{data.job_postedBy.username}</p>
						</div>
						<div className="second">
							<div className="ux-designer">{data.job_title}</div>
							<div className="time-posted">{formatDate(data.createdAt)}</div>
						</div>
					</div>

					<div className="job-card-details">
						<div className="row1">
							<div className="one-detail">
								<div className="job-logos">
									<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
								</div>
								<div>{data.job_experience} years</div>
							</div>
							<div className="second-detail">
								<div className="job-logos">
									<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
								</div>
								<div>{data.job_company_location}</div>
							</div>
						</div>
						<div className="row2">
							<div className="one-detail">
								<div className="job-logos">
									<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
								</div>
								<div>{data.job_type}</div>
							</div>
							<div className="second-detail">
								<div className="job-logos">
									<img src="https://i.pinimg.com/736x/fa/08/34/fa08346badcad803eca9b1b5cb796c3a.jpg"></img>
								</div>
								<div>{data.job_duration}</div>
							</div>
						</div>
					</div>
					<div className="skills">
						{
							data.job_tags.map((tag, index) => {
								return (<span key={index}>{tag}</span>)
							})
						}
					</div>
					<a className="apply-link" href={data.job_apply_link}>
						<span>Apply:</span> {data.job_apply_link}
					</a>
				</div>
			</div>
		</div>
	);
};

export default JobCard;
