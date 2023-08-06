import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';


function LandingPage() {
  const navigate = useNavigate();

const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
};

const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the registration page
};


    return (
        <div className="landing-page">
            <h2>Welcome to AI Load Broker</h2>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRegisterClick}>Register</button>
        </div>
    );
}

export default LandingPage;

