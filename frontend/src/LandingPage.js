import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';


function LandingPage() {
    const history = useHistory();

const handleLoginClick = () => {
    history.push('/login'); // Navigate to the login page
};

const handleRegisterClick = () => {
    history.push('/register'); // Navigate to the registration page
};


    return (
        <div className="landing-page">
            <h2>Welcome to AI Load Broker</h2>
            <button onClick={handleLoginClick}>Login</button>
            <button>Register</button>
        </div>
    );
}

export default LandingPage;

