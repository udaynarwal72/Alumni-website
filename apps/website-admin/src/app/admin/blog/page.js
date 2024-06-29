"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Home component to display the users' data
export default function Home() {
    const [blogData, setBlogData] = useState([]);

    const fetchBlogData = async() => {
        console.log('Fetching data from API...');
        await axios.get('http://localhost:3000/api/v1/blog/bulk')
            .then(res => {
                const allBlogs = res.data.data;
                setBlogData(allBlogs);
                console.log('Data fetched:', allBlogs);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Function to remove a blog by ID
    const removeBlog = (id) => {
        console.log('Removing blog with id:', id);
        axios.delete(`http://localhost:3000/api/v1/admin/deleteblog/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log('Blog removed:', res.data);
                fetchBlogData(); // Refresh data after deletion
            })
            .catch(error => {
                console.error('Error removing blog:', error);
            });
    };

    // Confirmation dialog for blog removal
    const handleRemoveClick = (id) => {
        const confirmation = window.confirm('Are you sure you want to remove this blog?');
        if (confirmation) {
            removeBlog(id);
        }
    };

    // Toggle removing state for a blog
    const toggleRemoving = (blogId) => {
        const updatedBlogs = blogData.map(blog => {
            if (blog._id === blogId) {
                return { ...blog, isRemoving: true };
            }
            return blog;
        });
        setBlogData(updatedBlogs);
    };

    // Rendering action button based on removing state
    const renderActionButton = (blog) => {
        if (blog.isRemoving) {
            return (
                <button className='btn btn-primary' disabled>Removing...</button>
            );
        } else {
            return (
                <button className='btn btn-danger' onClick={() => handleRemoveClick(blog._id)}>Remove</button>
            );
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchBlogData();
    }, []);

    // Log data updates for debugging
    useEffect(() => {
        console.log("Blog data updated:", blogData);
    }, [blogData]);

    return (
        <main className='overflow-scroll flex-1 align-center justify-center'>
            <table className="table m-5 w-auto">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created By</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                       </tr>
                </thead>
                <tbody>
                    {blogData.map((blog, index) => (
                        <tr key={blog._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{blog.blog_title}</td>
                            <td>{blog.blog_body}</td>
                            <td>{blog.blog_createdBy.username}</td>
                            <td>{blog.createdAt}</td>
                            <td>{renderActionButton(blog)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
