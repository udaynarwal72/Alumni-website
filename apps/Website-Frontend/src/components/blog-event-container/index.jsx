import React from 'react';
import './BlogAndEventSection.css';
import BlogSectionCard from '../Blog-section-card/BlogSectionCard';
import BlogCard from '../BlogCard/BlogCard';

const BlogAndEventSection = () => {
  return (
    <div className="blog-and-event-section">
      <div className="blog-section">
        <BlogSectionCard />
        <BlogSectionCard />
        <BlogCard/>
      </div>
      <div className="event-section">
        <div className="event">
          <div className="event-poster">
            <img src="https://via.placeholder.com/100" alt="Event Poster" />
          </div>
        </div>
        <div className="event">
          <div className="event-poster">
            <img src="https://via.placeholder.com/100" alt="Event Poster" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAndEventSection;
