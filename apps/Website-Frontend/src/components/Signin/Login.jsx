import React, { useState } from 'react';
import './LoginPage.css';
import NavBar from '../Navbar';
import Footer from '../footer';
import axios, { isCancel, AxiosError } from 'axios';

function App() {
    const makingUserLoggedIn = () => {
        // Make user logged in

    }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    async function onHandleSubmit(e) {
        e.preventDefault();
        const user = { email, password }
        const response = await axios.get('http://localhost:3000/api/v1/user/login', user)
        console.log(response)
        // localStorage.setItem("token",response.data.data.accessToken)
    }
    return (
        <>
            <NavBar />
            <div className="parent-login-container">
                <div className="login-container">
                    <h1>Login</h1>
                    <form >
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={(e) => {
                                setEmail(e.target.value)
                            }} name="email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={(p) => {
                                setPassword(p.target.value)
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

export default App;
