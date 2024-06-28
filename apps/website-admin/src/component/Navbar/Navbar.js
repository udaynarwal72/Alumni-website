import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
            <div className="heading-container">
                <a className="navbar-brand" href="/">React Admin</a>
            </div>
            <div className='subheading-container'>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto text-white ">
                        <li className="nav-item m-2 font-weight-bold">
                            <a className="nav-link font-weight-bold" href="/">Users</a>
                        </li>
                        <li className="nav-item m-2">
                            <a className="nav-link" href="/blog">Blog</a>
                        </li>
                        <li className="nav-item m-2">
                            <a className="nav-link" href="/herosection">Hero Section</a>
                        </li>
                        <li className="nav-item m-2">
                            <a className="nav-link" href="/event">Event</a>
                        </li>
                        <li className="nav-item m-2">
                            <a className="nav-link" href="/job">Blog</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
