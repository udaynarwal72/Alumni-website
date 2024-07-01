"use client";
// Ensure correct import path for Navbar component
import Navbar from '@/component/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Home component to display the users' data
export default function Home() {
    const [image, setImage] = useState([]);

    const getAllImage = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/admin/getallimage', {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            setImage(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addImageToHeroSection = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('coverImage', e.target.coverImage.files[0]);
        try {
            const res = await axios.post('http://localhost:3000/api/v1/admin/addphotoinherosection', formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data",
                }
            });
            getAllImage();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteImageFromHeroSection = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/admin/adminremoveimage/${id}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                }
            });
            getAllImage();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getAllImage();
    }, []); // Empty dependency array ensures useEffect runs only once

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center flex-row bg-light">
            <main className="overflow-scroll p-4">
                <div className="container bg-white d-flex flex-col shadow-lg rounded-lg p-4">
                    <table className="table table-striped">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {image.map((img, index) => (
                                <tr key={img._id}>
                                    <td className="m-4">{index + 1}</td>
                                    <td className="m-4">{img.createdBy.username}</td>
                                    <td>
                                        <img src={img.coverImage} alt="coverImage" height="90" width="100" className="img-fluid m-4" />
                                    </td>
                                    <td className="text-center">
                                        <button type="button" onClick={() => deleteImageFromHeroSection(img._id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <form onSubmit={addImageToHeroSection} className="m-4 d-flex flex-row">
                        <div className="d-flex align-items-center">
                            <input type="file" name="coverImage" className="form-control-file mr-2" />
                            <button type="submit" className="btn btn-primary">Add Image</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
