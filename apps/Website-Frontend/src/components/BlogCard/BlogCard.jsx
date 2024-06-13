import "./BlogCard.css";

const BlogCard = () => {
	return (
		<div className="Parent-card">
			<div className="Main-blog-card">
				<div className="blog-card">
					<div className="card-image">
						<img src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/04/chinafalls1.jpg?w=1024&h=681"></img>
					</div>
					<div className="card-content">
						<div className="card-category">Technology</div>
						<h2 className="card-title">
							<a href="http://localhost:5173/blog">
								Why is waterfall so beautiful?
							</a>
						</h2>
						<p className="card-desc">
							A well known waterfall known for its magnificient beauty
						</p>
					</div>
					<div className="card-footer">
						<div className="aut-image">
							<img src="https://miro.medium.com/v2/resize:fill:55:55/1*7l1EOKCS6EEzIAmGbUWsxg.jpeg"></img>
						</div>
						<div className="aut-desc">
                            <div>
                                <span>John Walton</span>
                                <span>Yesterday</span>
                            </div>
                        </div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
