import "./BlogSectionCard.css";

const BlogSectionCard = () => {
	return (
		<div className="root-blog-sec-card">
			<div className="blog-sec-card">
				<div className="sec-card-details">
					<div className="sec-card-info">
						<img
							src="https://miro.medium.com/v2/resize:fill:176:176/1*v2jvthQJ4-zUQTzn5JlLfg.jpeg"
							className="auth-image"
						></img>
						<div>
							<p>Ryan Byan in towards Data science</p>
						</div>
						<span>1 day ago</span>
						<span>Member only</span>
					</div>
					<div className="blog-sec-para">
						<div className="title">
							Introduction to Objective Bayesian Hypothesis Testing
						</div>
					</div>
					<div className="description">
						How to derive posterior probabilities for hypotheses using default
						Bayes factors — Hypothesis testing pervades statistical education
						and...
					</div>
                    <div className="sec-card-footer">
                        <div className="footer-left"><button>Statistics</button>
                        <span>5 min read</span></div>
                        
                    </div>
				</div>
				<div className="sec-card-image">
					<div><img src="https://miro.medium.com/v2/resize:fill:140:140/1*_tevXbtYsWCPtFSLuXw2Iw.jpeg"></img></div>
                    
				</div>
			</div>
		</div>
	);
};

export default BlogSectionCard;
