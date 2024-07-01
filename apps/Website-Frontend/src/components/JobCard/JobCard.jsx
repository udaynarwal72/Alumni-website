import JobData from "../../../../Website-Backend/src/Schema/JobSchema";
import "./JobCard.css";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jobSuitCase from "../../assets/jobsuitcase.svg";
import jobLocation from "../../assets/location-icon.svg";
import homeIcon from "../../assets/homeicon.svg";
import twoPeopleIcon from "../../assets/two-people-icon.svg";

const JobCard = ({ data }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDifference = now - date;

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    if (daysDifference > 0) {
      return `${daysDifference} days ago`;
    } else {
      return `${hoursDifference} hours ago`;
    }
  };

  const redirectToBlog = (e) => {
    navigate(`/jobpage/${data._id}`);
  };

  return (
    <div onClick={(e) => redirectToBlog(e)}>
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
                  <img src={jobSuitCase} alt="Job Experience" />
                </div>
                <div>{data.job_experience} years</div>
              </div>
              <div className="second-detail">
                <div className="job-logos">
                  <img src={jobLocation} alt="Job Location" />
                </div>
                <div>{data.job_company_location}</div>
              </div>
            </div>
            <div className="row2">
              <div className="one-detail">
                <div className="job-logos">
                  <img src={homeIcon} alt="Job Type" />
                </div>
                <div>{data.job_type}</div>
              </div>
              <div className="second-detail">
                <div className="job-logos">
                  <img src={twoPeopleIcon} alt="Job Duration" />
                </div>
                <div>{data.job_duration}</div>
              </div>
            </div>
          </div>
          <div className="skills">
            {data.job_tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
