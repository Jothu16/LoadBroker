import React from 'react';
import './RegisterPage.css';
import { useState } from 'react';


// This component provides a registration form for new users.
function RegistrationPage() {

    const handleRegistration = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Here, you'll send the form data to the backend
    console.log("User Registration Data:", { username, password, email });
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

