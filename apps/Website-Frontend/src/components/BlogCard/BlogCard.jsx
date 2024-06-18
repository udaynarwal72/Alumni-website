import React, { useState, useEffect } from 'react';
import './BlogCard.css';
import axios from 'axios';
import BlogDetails from '../../pages/Blogdisplay';
import Blog from '../../../../Website-Backend/src/Schema/BlogSchema';

const BlogCard = ({ data }) => {
    const { blog_title, blog_body, blogImage, tags, blog_createdBy, createdAt } = data;
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/getuserbyid/${blog_createdBy}`);
                setAuthor(response.data.data); // Assuming the response has more details than just the username
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthor();
    }, [blog_createdBy]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading author information.</div>;
    }

    const blogRedirect = () => {
        window.location.href = `/blog/${data._id}`;
    }

    return (
        <div className="parent-card">
            <div className="main-blog-card" onClick={blogRedirect}>
                <div className="blog-card">
                    <div className="card-image">
                        <img src={blogImage} alt={blog_title} />
                    </div>
                    <div className="card-content">
                        <div className="card-category">
                            {tags}
                        </div>
                        <h2 className="card-title">
                            <a href={`/blog/${data._id}`}>{blog_title}</a>
                        </h2>
                        <p className="card-desc">{truncateText(blog_body, 20)}</p>
                    </div>
                    <div className="card-footer">
                        <div className="aut-image">
                            <img src={author.profileImage || blogImage} alt={author.name || blog_createdBy} />
                        </div>
                        <div className="aut-desc">
                            <div>
                                <span>{author.username}</span> {/* Assuming the author object has a username property */}
                                <span>{formatDate(createdAt)}</span> {/* Format and display the createdAt date */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
