import "./BlogSectionCard.css";

const BlogSectionCard = ({ data }) => {
    const { blog_title, blog_body, blogImage, tags, blog_createdBy, createdAt, _id } = data;

    // Function to limit the blog body to 20 words
    const truncateText = (text, limit) => {
        const words = text.split(' ');
        return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    };
    const redirectBlog = () => {
        window.location.href = `/blog/${data._id}`;
    }

    return (
        <div className="root-blog-sec-card">
            <div className="blog-sec-card">
                <div className="sec-card-details">
                    <div className="sec-card-info">
                        <img
                            src="https://miro.medium.com/v2/resize:fill:176:176/1*v2jvthQJ4-zUQTzn5JlLfg.jpeg"
                            className="auth-image"
                            alt="Author"
                        />
                        <div>
                            <p>Ryan Byan in towards Data science</p>
                        </div>
                        <span>1 day ago</span>
                        <span>Member only</span>
                    </div>
                    <div className="blog-sec-para">
                        <div className="title">
                            {blog_title}
                        </div>
                    </div>
                    <div className="description">
                        {truncateText(blog_body, 20)}
                    </div>
                    <div className="sec-card-footer">
                        {/* {tags.map((index, tag) => (
                                <div className="footer-left"><button>{tag}</button></div>
                            ))} */}
                        <span><button onClick={redirectBlog} className="read-more">Read More</button></span>
                    </div>
                </div>
                <div className="sec-card-image">
                    <div><img src={blogImage} alt="Blog" /></div>
                </div>
            </div>
        </div>
    );
};

export default BlogSectionCard;
