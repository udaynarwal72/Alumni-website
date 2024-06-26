import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ data }) => {
    const navigate = useNavigate();
    const { _id, blog_title, blog_body, blogImage, blog_tags, blog_createdBy, createdAt } = data;

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const blogRedirect = () => {
        navigate(`/blogpage/${_id}`);
    };
    return (
        <div className="parent-card" onClick={blogRedirect}>
            <div className="main-blog-card">
                <div className="blog-card">
                    <div className="card-image">
                        <img src={blogImage} alt={blog_title} />
                    </div>
                    <div className="card-content">
                        {blog_tags?.map((tag, index) => (
                            <div key={index} className="card-category">
                                {tag}
                            </div>
                        ))}
                        <h2 className="card-title">
                            {blog_title}
                        </h2>
                        <p className="card-desc">{truncateText(blog_body, 20)}</p>
                    </div>
                    <div className="card-footer">
                        <div className="aut-image">
                            <img src={blog_createdBy.avatar} alt={blog_createdBy.username} />
                        </div>
                        <div className="aut-desc">
                            <div>
                                <span>{blog_createdBy.username}</span>
                                <span>{formatDate(createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
