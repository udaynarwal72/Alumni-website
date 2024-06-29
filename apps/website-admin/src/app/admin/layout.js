"use client";
// Import necessary modules
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/component/Navbar/Navbar';
import Footer from '@/component/Footer/Footer';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define RootLayout component
export default function RootLayout({ children }) {
  const router = useRouter();

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log('Token:', !!token);
    return !!token;
  };

  // useEffect to handle authentication redirection
  useEffect(() => {
    if (!isAuthenticated()) {
      console.log('User is not authenticated');
      router.push('/');
    }
  }, []); // Empty dependency array to run once on component mount

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: '1 0 auto' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
