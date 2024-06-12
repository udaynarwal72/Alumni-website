import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    console.log('UserProfile component');
    // const { userId } = useParams(); // Destructuring userId from the useParams return object
    const userId = '6668b7e9cd97529c7052fcdc';
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                console.log(userId);
                console.log(`Fetching details for user ID: ${userId}`);
                const response = await axios.get(`http://localhost:3000/api/v1/user/profile/${userId}`);
                console.log('Response data:', response.data);
                setUser(response.data.data); // Corrected line
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

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
