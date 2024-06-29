"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Home component to display the users' data
export default function Home() {
  const [userData, setUserData] = useState([]);

  const userDataFunc = () => {
    console.log('Fetching data from API...');
    // Fetching data using Axios
    axios.get('http://localhost:3000/api/v1/user/findalumni')
      .then(res => {
        const allUsers = res.data.data;
        setUserData(allUsers);
        console.log('Data fetched:', allUsers);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const pushToWaitingroom = async (id) => {
    try {
      console.log('Allowing user with id:', id);
      const response = await axios.put(
        `http://localhost:3000/api/v1/admin/pushtowaitingroom/${id}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('User allowed:', response.data);
      userDataFunc();
    } catch (error) {
      console.error('Error allowing user:', error);
    }
  };

  const UserRemove = (id) => {
    console.log('Removing user with id:', id);
    // Removing user using Axios
    axios.delete(`http://localhost:3000/api/v1/admin/deleteuser/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log('User removed:', res.data);
        userDataFunc(); // Refresh data after deletion
      })
      .catch(error => {
        console.error('Error removing user:', error);
      });
  };

  const handleRemoveClick = (id) => {
    const confirmation = window.confirm('Are you sure you want to remove this user?');
    if (confirmation) {
      UserRemove(id);
    }
  };

  useEffect(() => {
    userDataFunc(); // Fetch data on component mount
  }, []);

  const renderActionButton = (user) => {
    if (user.isRemoving) {
      return (
        <button className='btn btn-primary' onClick={() => handleRemoveClick(user._id)}>Confirm</button>
      );
    } else {
      return (
        <button className='btn btn-danger' onClick={() => setUserRemoving(user._id)}>Remove</button>
      );
    }
  };

  const setUserRemoving = (userId) => {
    const updatedUsers = userData.map(user => {
      if (user._id === userId) {
        return { ...user, isRemoving: true };
      }
      return user;
    });
    setUserData(updatedUsers);
  };

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
            <th scope="col">Status</th>
            <th scope="col">Action</th>
            <th scope="col">Waiting Room</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.joining_batch}</td>
              <td>{user.branch}</td>
              <td>{user.verification_status}</td>
              <td>{renderActionButton(user)}</td>
              <td><button className='btn btn-primary' onClick={() => pushToWaitingroom(user._id)}>Push</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
