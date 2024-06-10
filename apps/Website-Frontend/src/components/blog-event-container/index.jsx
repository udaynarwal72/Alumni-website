import React from 'react';
import './BlogAndEventSection.css';

const BlogAndEventSection = () => {
  return (
    <div className="blog-and-event-section">
      <div className="blog-section">
        <div className="blog">
          <div className="blog-image">
            <img src="https://via.placeholder.com/150" alt="Blog" />
          </div>
          <div className="blog-content">
            <h2>Blog Heading</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at velit vel erat placerat fermentum.</p>
          </div>
        </div>
        <div className="blog">
          <div className="blog-image">
            <img src="https://via.placeholder.com/150" alt="Blog" />
          </div>
          <div className="blog-content">
            <h2>Blog Heading</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at velit vel erat placerat fermentum.</p>
          </div>
        </div>
        <div className="blog">
          <div className="blog-image">
            <img src="https://via.placeholder.com/150" alt="Blog" />
          </div>
          <div className="blog-content">
            <h2>Blog Heading</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at velit vel erat placerat fermentum.</p>
          </div>
        </div>
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
