import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();
    const [registrationStatus, setRegistrationStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);  // Loading state

    const handleRegistration = async (event) => {
        event.preventDefault();
        setIsLoading(true);  // Set loading state to true when registration starts

        const formData = new FormData(event.target);
        const firstName = formData.get('firstName');
        const password = formData.get('password');
        const email = formData.get('email');

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                firstName,
                password,
                email
            });

            if (response && response.data) {
                console.log(response.data.message);
                setRegistrationStatus(response.data.message);  // Update registration status on success
            } else {
                throw new Error("Unexpected server response");
            }

            // Optionally, navigate the user to the login page after successful registration
            // navigate('/login');
        } catch (error) {
            console.error("Error during registration:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
            setRegistrationStatus(errorMessage);  // Update registration status on error
        } finally {
            setIsLoading(false);  // Set loading state to false when registration ends
        }
    };

    return (
        <div className="registration-page" style={{ padding: '20px' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <input type="text" name="firstName" placeholder="First Name" required style={{ display: 'block', marginBottom: '10px' }} />
                <input type="email" name="email" placeholder="Email" required style={{ display: 'block', marginBottom: '10px' }} />
                <input type="password" name="password" placeholder="Password" required style={{ display: 'block', marginBottom: '10px' }} />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
            {registrationStatus && <p style={{ marginTop: '20px', color: 'red' }}>{registrationStatus}</p>}
        </div>
    );
}

export default RegistrationPage;
