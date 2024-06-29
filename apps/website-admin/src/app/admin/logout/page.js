"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        // Remove the token from local storage
        localStorage.removeItem('token');

        // Redirect to login page or home page
        router.push('/'); // Use router.push to navigate programmatically
    }, [router]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default Logout;
