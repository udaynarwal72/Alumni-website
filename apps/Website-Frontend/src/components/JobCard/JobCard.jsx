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
        <div className="main-job-card hover:bg-[#E1E5F2]">
          <div className="all-set">
            <div className="job-card-header">
              <h1 className="font-dmserif font-bold">{data.job_company}</h1>
              <p className="font-dmsans">@{data.job_postedBy.username}</p>
            </div>
            <div className="second">
              <div className="font-dmsans text-white font-semibold test-3xl">{data.job_title}</div>
              <div className="time-posted font-dmsans">{formatDate(data.createdAt)}</div>
            </div>
          </div>
          <div className="job-card-details ">
            <div className="row1">
              <div className="one-detail flex items-center">
                <div className="job-logos">
                  <img src={jobSuitCase} alt="Job Experience" />
                </div>
                <div className="font-dmsans">{data.job_experience} years</div>
              </div>
              <div className="second-detail flex items-center">
                <div className="job-logos">
                  <img src={jobLocation} alt="Job Location" />
                </div>
                <div className="font-dmsans">{data.job_company_location}</div>
              </div>
            </div>
            <div className="row2">
              <div className="one-detail flex items-center">
                <div className="job-logos">
                  <img src={homeIcon} alt="Job Type" />
                </div>
                <div className="font-dmsans">{data.job_type}</div>
              </div>
              <div className="second-detail flex items-center">
                <div className="job-logos">
                  <img src={twoPeopleIcon} alt="Job Duration" />
                </div>
                <div className="font-dmsans">{data.job_duration}</div>
              </div>
            </div>
          </div>
          <div className="skills font-dmsans">
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
