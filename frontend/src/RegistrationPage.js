import React, { useState } from 'react';  // Added useState import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();
    const [registrationStatus, setRegistrationStatus] = useState('');  // New state for registration status

    const handleRegistration = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const email = formData.get('email');

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                username,
                password,
                email
            });

            console.log(response.data.message);
            setRegistrationStatus(response.data.message);  // Update registration status on success

            // Optionally, you can navigate the user to the login page after successful registration
            // navigate('/login');
        } catch (error) {
            console.error("Error registering user:", error.response.data.message);
            setRegistrationStatus(error.response.data.message);  // Update registration status on error
        }
    };

    return (
        <div className="registration-page">
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <input type="text" name="username" placeholder="Username" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
            {registrationStatus && <p>{registrationStatus}</p>}  {/* Display the registration status */}
        </div>
    );
}

export default RegistrationPage;


