"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import corrected useRouter from next/router // Assuming useClient is a custom hook you've created

// Replace with your authentication logic (e.g., checking if user is authenticated)
export default function Home() {


  return (
    <main className='container d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <div className='text-center'>
        <h1 className='display-4 mb-4'>Welcome to the Admin Page</h1>
      </div>
    </main>
  );
}
