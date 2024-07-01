"use client";

import { useState, useEffect } from "react";
import axios from 'axios';

const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);

    const fetchAnnouncement = async () => {
        try {
            console.log("Fetching announcement data...");
            const response = await axios.get('http://localhost:3000/api/v1/announcement/getannouncements');
            if (Array.isArray(response.data.data)) {
                setAnnouncements(response.data.data);
            } else {
                console.error("Unexpected response format:", response.data);
            }
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching announcement data:", error);
        }
    }

    useEffect(() => {
        fetchAnnouncement();
    }, []);

    const removeAnnouncement = (id) => {
        return async () => {
            const confirmed = window.confirm("Are you sure you want to remove this announcement?");
            if (!confirmed) {
                return;
            }
            try {
                console.log("Removing announcement with id:", id);
                const response = await axios.delete(
                    `http://localhost:3000/api/v1/admin/deleteannouncement/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                console.log("Announcement removed:", response.data);
                fetchAnnouncement();
            } catch (error) {
                console.error("Error removing announcement:", error);
            }
        }
    }

    return (
        <div className="announcement-parent">
            <div className="announcement-heading">
                <h1 className="text-4xl text-left text-[#022B3A] font-embdedcode">
                    Announcements
                </h1>
                <div className="w-full">
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
                            {announcements.map((announcement, index) => (
                                <tr key={announcement.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{announcement.title}</td>
                                    <td>{announcement.body}</td>
                                    <td>{announcement.createdBy.username}</td>
                                    <td>{announcement.createdAt}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={removeAnnouncement(announcement._id)}>remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Announcement;
