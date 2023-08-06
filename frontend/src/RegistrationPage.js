import React from 'react';
import './RegisterPage.css';
import { useState } from 'react';
import axios from 'axios';



// This component provides a registration form for new users.
function RegistrationPage() {

    const handleRegistration = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                username,
                password,
                email
            });

            console.log(response.data.message); // "User registered successfully!"
        } catch (error) {
            console.error("Error registering user:", error.response.data.message);
        }
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className="registration-page">
            <h2>Register</h2>
            <form onSubmit={handleRegistration}> {/* Add the onSubmit attribute here */}
                {/* Input fields for username, password, and email */}
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Registration button */}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}


export default RegistrationPage;

