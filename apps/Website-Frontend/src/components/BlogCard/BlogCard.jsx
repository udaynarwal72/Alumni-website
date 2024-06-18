import React, { useState, useEffect } from 'react';
import './BlogCard.css';

const BlogCard = ({ data }) => {
    const { blog_title, blog_body, blogImage, tags, blog_createdBy, createdAt } = data;

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
                            <img src={blog_createdBy.avatar} alt={blog_createdBy.username} />
                        </div>
                        <div className="aut-desc">
                            <div>
                                <span>{blog_createdBy.username}</span>
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
