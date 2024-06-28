"use client";

import Navbar from '@/component/Navbar/Navbar';
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
  }
  const UserRemove = (e, id) => {
    console.log('Removing user with id:', id);
    // Removing user using Axios
    axios.delete(`http://localhost:3000/api/v1/user/${id}`)
      .then(res => {
        console.log('User removed:', res.data);
        userDataFunc();
      })
      .catch(error => {
        console.error('Error removing user:', error);
      });
  }
  useEffect(() => {
    userDataFunc();
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
            <th scope="col">Action</th>
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
              <td><button className='btn btn-danger'  onClick={(e) => { UserRemove(e, user._id) }}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
