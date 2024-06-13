import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { isCancel, AxiosError } from 'axios';
const UserProfile = () => {
    console.log('UserProfile component');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // const cookies = getCookies
                const header = localStorage.getItem("token")
                const response = await axios.get('http://localhost:3000/api/v1/user/profilesection', { headers: { "Authorization": `Bearer ${header}`}});
                setUser(response.data.data);
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []); // Added dependency array here

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading user details: {error.message}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            {user && (
                <div>
                    <p>Name: {user.first_name} {user.last_name}</p>
                    <p>Email: {user.email}</p>
                    <p>Branch: {user.branch}</p>
                    <p>City: {user.city}</p>
                    <p>Country: {user.country}</p>
                    <p>Organisation: {user.organisation}</p>
                    <p>Phone Number: {user.phone_number}</p>
                    {/* Add other user details here */}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
