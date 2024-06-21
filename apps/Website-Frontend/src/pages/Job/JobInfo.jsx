import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer";
import "../../styles/JobInfo.css";

const JobInfo = () => {
	const { jobId } = useParams();
	const [jobData, setJobData] = useState({});

	useEffect(() => {
		const getJobData = async () => {
			try {
				const response = await axios.get(`http://localhost:3000/api/v1/job/getjob/${jobId}`);
				setJobData(response.data.data);
			} catch (error) {
				console.error("Error fetching job data:", error);
			}
		};
		getJobData();
	}, [jobId]);

	const redirectToApply = () => {
		window.location.href = jobData.job_apply_link;
	};

	return (
		<>
			<NavBar />
			<div className="parent-job-info">
				<div className="upper-cont">
					<div className="main-job">
						<div className="job-head">
							<h1>{jobData.job_title}</h1>
						</div>
					</div>
					<div className="whole-flex">
						<div className="job-col1">
							<div className="all-head">
								Company-<div className="all-name">{jobData.job_company}</div>
							</div>
							<div className="all-head">
								Type-<div className="all-name">{jobData.job_type}</div>
							</div>
						</div>
						<div className="job-col1">
							<div className="all-head">
								Location-<div className="all-name">{jobData.job_company_location}</div>
							</div>
							<div className="all-head">
								Duration-<div className="all-name">{jobData.job_duration}</div>
							</div>
						</div>
					</div>
				</div>
				<div className="lower-cont">
					<div className="lower-row">
						<div className="about-comp">
							<div>
								<h1>About the Company</h1>
							</div>
							<div className="comp-para">
								<h3>{jobData.job_company_description}</h3>
							</div>
						</div>
						<div className="about-comp">
							<div>
								<h1>About The Role</h1>
							</div>
							<div className="comp-para">
								<h3>{jobData.job_about_role}</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="apply-job">
					{jobData.job_apply_email && jobData.job_apply_link ? (
						<>
							<div><h1>Send your CV at:</h1></div>
							<div><h3>{jobData.job_apply_email}</h3></div>
							<div>or</div>
							<div><button className="apply-here" onClick={redirectToApply}>Apply Here</button></div>
						</>
					) : jobData.job_apply_email ? (
						<>
							<div><h1>Send your CV at:</h1></div>
							<div><h3>{jobData.job_apply_email}</h3></div>
						</>
					) : jobData.job_apply_link ? (
						<div><button className="apply-here" onClick={redirectToApply}>Apply Here</button></div>
					) : null}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default JobInfo;
