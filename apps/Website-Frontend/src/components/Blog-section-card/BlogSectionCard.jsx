import "./BlogSectionCard.css";
import { useNavigate } from "react-router";

const BlogSectionCard = ({ data }) => {
    const navigate = useNavigate();
    const { blog_title, blog_body, blogImage, blog_tags, blog_createdBy, createdAt, _id } = data;

    // Function to limit the blog body to 20 words
    const truncateText = (text, limit) => {
        const words = text.split(' ');
        return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    };
    const redirectBlog = () => {
        navigate(`/blogpage/${_id}`);
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    return (
        <div className="root-blog-sec-card">
            <div className="blog-sec-card">
                <div className="sec-card-details">
                    <div className="sec-card-info">
                        <img
                            src={blog_createdBy.avatar}
                            className="auth-image"
                            alt="Author"
                        />
                        <div>
                            <p>@{blog_createdBy.username}</p>
                        </div>
                        <span>{formatDate(createdAt)}</span>
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
                        {blog_tags?.map((tag, index) => (
                            <div className="footer-left" key={index}><button>{tag}</button></div>
                        ))}
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
