import NavBar from "../../components/Navbar";
import Footer from "../../components/footer";
import "../../styles/JobInfo.css";

const JobInfo = () => {
	return (
		<>
			<NavBar />
			<div className="parent-job-info">
				<div className="upper-cont">
					<div className="main-job">
						<div className="job-head">
							<h1>Frontend Engineer</h1>
						</div>
					</div>
					<div className="whole-flex">
						<div className="job-col1">
							<div className="all-head">
								Company-<div all-name>Noto America</div>
							</div>
							<div className="all-head">
								Type-<div all-name>Remote</div>
							</div>
						</div>
						<div className="job-col1">
							<div className="all-head">
								Location-<div all-name>Bengaluru,India</div>
							</div>
							<div className="all-head">
								Duration-<div all-name>Full Time</div>
							</div>
						</div>
					</div>
				</div>
				<div className="lower-cont">
					<div className="lower-row">
						<div className="about-comp">
							<div>
								<h1>About the Company </h1>
							</div>
							<div className="comp-para">
								<h3>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
									harum. Odio, ab vel? Eveniet vitae officiis, ab accusantium
									expedita quod fuga quaerat libero eligendi.
								</h3>
							</div>
							
						</div>
						<div className="about-comp">
							<div>
								<h1>About The Role </h1>
							</div>
							<div className="comp-para">
								<h3>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
									harum. Odio, ab vel? Eveniet vitae officiis, ab accusantium
									expedita quod fuga quaerat libero eligendi.
								</h3>
							</div>
							
						</div>
					</div>
				</div>
				<div className="apply-job">
					<div><h1>Send your CV at:</h1></div>
					<div><h3>abcd@helloworld.com</h3></div>
					<div><h4>Or</h4></div>
					<div><button className="apply-here">Apply Here</button></div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default JobInfo;
