import React, { useState } from 'react';
import '../../styles/SignIn.css';
import NavBar from '../../components/Navbar';
import Footer from '../../components/footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
                const userId = response.data.data.user._id;
                localStorage.setItem("token", response.data.data.accessToken);
                localStorage.setItem("first_name", response.data.data.user.first_name);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("user_id", userId);
                const notificationToken = localStorage.getItem("notification-token");
                Cookies.set('user-accessToken', response.data.data.accessToken);
                Cookies.set('user-id', userId)
                await fetch(`http://localhost:3000/api/v1/user/save-notification-token/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ notification_token: notificationToken })
                });
                console.log('Notification token saved successfully');
                window.location.href = "/"; // Redirect to the home page
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
            <div className="parent-login">
                <div className="parent-login-container">
                    <div className="left-panel">
                        <div className="card-image-container">
                            <img src="https://casepl.in/wp-content/uploads/2024/05/reck-logo-in-white-colour-120x93.png"></img>
                        </div>
                        <div className="verification">
                            <h2>Be Verified</h2>
                            <p>Join NIT KKR Alumni Community</p>
                        </div>
                    </div>
                    <div className="right-panel">
                        <h2>Welcome Back</h2>
                        <p>We are happy to have you back</p>
                        <form class="login-form">
                            <input type="email" id="email" onChange={(e) => {
                                setEmail(e.target.value);
                            }} name="email" placeholder='email' required />
                            <input type="password" id="password" onChange={(p) => {
                                setPassword(p.target.value);
                            }} placeholder='password' name="password" required />
                            <div className="remember-forget">
                                <a href="#">Forgot Password?</a>
                            </div>
                            <button type="submit" onClick={onHandleSubmit} class="login-button">Login</button>
                        </form>
                        <p class="Dont">Don't have an account?</p> <a href="">Sign Up</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignInPage;
