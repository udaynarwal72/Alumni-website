"use client";

import Navbar from '@/component/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Home component to display the users' data
export default function Home() {
    const [userData, setUserData] = useState([]);

    // Function to fetch data from API
    const fetchUserData = async () => {
        try {
            console.log('Fetching data from API...');
            const response = await axios.get('http://localhost:3000/api/v1/user/findalumni');
            const allUsers = response.data.data;
            setUserData(allUsers.filter(user => user.verification_status === 'pending'));
            console.log('Data fetched:', allUsers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to allow a user
    const allowUser = async (id) => {
        try {
            console.log('Allowing user with id:', id);
            const response = await axios.put(
                `http://localhost:3000/api/v1/admin/allowuser/${id}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log('User allowed:', response.data);
            fetchUserData();
        } catch (error) {
            console.error('Error allowing user:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <main className='overflow-scroll flex-1 align-center justify-center'>
            <table className="table m-5 w-auto">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Joining Batch</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.joining_batch}</td>
                            <td>{user.branch}</td>
                            <td>{user.phone_number}</td>
                            <td>{user.verification_status}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => allowUser(user._id)}>Allow</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
