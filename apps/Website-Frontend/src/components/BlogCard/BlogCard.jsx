import React from 'react';
import './BlogCard.css';
import BlogSectionCard from '../Blog-section-card/BlogSectionCard';

const BlogCard = ({ data }) => {
    const { blog_title, blog_body, blogImage, tags, createdBy } = data;

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };
    console.log('tags',tags)
    return (
        <div className="parent-card">
            <div className="main-blog-card">
                <div className="blog-card">
                    <div className="card-image">
                        <img src={blogImage} alt={blog_title} />
                    </div>
                    <div className="card-content">
                        <div className="card-category">
                            {tags}
                        </div>
                        <h2 className="card-title">
                            <a href="http://localhost:5173/blog">{blog_title}</a>
                        </h2>
                        <p className="card-desc">{truncateText(blog_body, 20)}</p>
                    </div>
                    <div className="card-footer">
                        <div className="aut-image">
                            <img src={blogImage} alt={createdBy} />
                        </div>
                        <div className="aut-desc">
                            <div>
                                <span>{createdBy}</span>
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