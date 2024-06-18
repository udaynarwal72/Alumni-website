import React, { useEffect } from "react";
import "../styles/BlogForm.css";
import NavBar from "../components/Navbar";
import Footer from "../components/footer";

const BlogForm = () => {

	const createBlog = () => {
		const form = document.querySelector('.blog-form');
		const formData = new FormData(form);

		fetch('http:', {
			method: 'POST',
			body: formData
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				if (data.status === 'success') {
					alert('Blog created successfully');
				} else {
					alert('An error occurred. Please try again');
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
	}


	return (
		<>
			<NavBar />
			<div className="parent-blog-form">
				<div className="blog-form-container">
					<form
						action="/submit_blog"
						method="post"
						enctype="multipart/form-data"
						className="blog-form"
					>
						<h2 className="form-h2">Share Your Thoughts</h2>
						<label for="name" >Name:</label>
						<input type="text" id="name" name="name" required></input>

						<label for="date">Date Uploaded:</label>
						<input type="date" id="date" name="date" required></input>

						<label for="tags">Tags:</label>
						<input
							type="text"
							id="tags"
							name="tags"
							placeholder="e.g., tech, health, education"
							required
						></input>

						<label for="images">Upload Images:</label>
						<input
							type="file"
							id="images"
							name="images[]"
							multiple
							required
						></input>

						<label for="body">Body:</label>
						<textarea id="body" name="body" rows="10" required></textarea>

						<button type="submit" onClick={createBlog} className="blog-form-button">Post</button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default BlogForm;
