import React from 'react';
import './Navbar.css';

// This component represents the navigation bar.
function Navbar() {
    return (
        <nav className="navbar">
            <h2>AILoadBroker</h2>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                {/* Add more navigation links as needed */}
            </ul>
        </nav>
    );
}

export default Navbar;
