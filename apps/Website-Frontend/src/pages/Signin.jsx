import React, { useState } from 'react';
import '../styles/SignIn.css';
import NavBar from '../components/Navbar';
import Footer from '../components/footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function onHandleSubmit(e) {
        e.preventDefault();
        const user = { email, password };
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/login', user);
            if (response.status === 200 && response.data.data.accessToken) {
                localStorage.setItem("token", response.data.data.accessToken);
                const notificationToken = localStorage.getItem("notification-token");
                localStorage.setItem('userid', response.data.data.user._id);
                const userId = response.data.data.user._id;
                await fetch(`http://localhost:3000/api/v1/user/save-notification-token/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ notification_token: notificationToken })
                });
                console.log('Notification token saved successfully');
                navigate('/'); // Redirect to the home page
            } else {
                setErrorMessage("Login failed. Please check your email and password.");
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("An error occurred. Please try again later.");
        }
    }

    return (
        <>
            <NavBar />
            <div className="parent-login-container">
                <div className="login-container">
                    <h1>Login</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={(e) => {
                                setEmail(e.target.value);
                            }} name="email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={(p) => {
                                setPassword(p.target.value);
                            }} name="password" required />
                        </div>
                        <button onClick={onHandleSubmit} type="submit">Login</button>
                        <div className="forgot-password">
                            <a href="/forgot-password">Forgot Password?</a>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignInPage;
