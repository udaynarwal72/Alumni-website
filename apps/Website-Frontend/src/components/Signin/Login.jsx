import React from 'react';
import './LoginPage.css';
import NavBar from '../Navbar';
import Footer from '../footer';

function App() {
    return (
        <>
            <NavBar />
            <div className="parent-login-container">
                <div className="login-container">
                    <h1>Login</h1>
                    <form action="/login" method="post">
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <button type="submit">Login</button>
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
