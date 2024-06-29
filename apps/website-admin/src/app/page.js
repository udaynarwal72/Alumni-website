"use client";
import React from 'react';
import axios from 'axios';

// Home component to display the users' data
export default function Home() {
  const loginUser = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/adminsignin', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.data.accessToken);
        window.location.href = '/admin';
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='d-flex align-items-center justify-content-center vh-100 bg-light'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card shadow-sm'>
              <div className='card-header bg-dark text-light text-center'>
                <h1>Admin Login</h1>
              </div>
              <div className='card-body'>
                <form method='POST' onSubmit={loginUser}>
                  <div className='form-group mb-3'>
                    <label htmlFor='username' className='form-label'>Username</label>
                    <input type='text' id='username' name='username' className='form-control' required />
                  </div>
                  <div className='form-group mb-3'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='password' id='password' name='password' className='form-control' required />
                  </div>
                  <button type='submit' className='btn btn-primary w-100'>Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
