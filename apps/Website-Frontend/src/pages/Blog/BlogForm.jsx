import React from "react";
import axios from "axios";
import "../../styles/BlogForm.css";
import NavBar from "../../components/Navbar";
import Footer from "../../components/footer";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const navigate = useNavigate();

  const createBlog = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const form = event.target;
    const formData = new FormData(form);

    axios.post('http://localhost:3000/api/v1/blog/postblog', formData, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('user-accessToken')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        if (data.status === 200) {
          fireToast("Blog created successfully", data.data._id);
        } else {
          alert('An error occurred. Please try again');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again');
      });
  };

  const fireToast = (toastData, blogId) => {
    toast(toastData, {
      onClose: () => navigate(`/blogpage/${blogId}`)
    });
  };

  return (
    <>
      <NavBar />
      <div className="parent-blog-form">
        <div className="blog-form-container">
          <form
            method="POST"
            className="blog-form"
            onSubmit={createBlog} // Handle form submission with the createBlog function
          >
            <h2 className="form-h2">Share Your Thoughts</h2>
            <label htmlFor="name">Title:</label>
            <input type="text" id="blog_title" className="demo" name="blog_title" required></input>

            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="demo"
              placeholder="Tech Health Education"
              required
            ></input>

            <label htmlFor="images">Upload Images:</label>
            <input
              type="file"
              id="blogImage"
              name="blogImage"
              className="demo"
              multiple
              required
            ></input>

            <label htmlFor="body">Body:</label>
            <textarea id="blog_body" name="blog_body" rows="10" required></textarea>

            <button type="submit" className="blog-form-button">Post</button>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default BlogForm;
