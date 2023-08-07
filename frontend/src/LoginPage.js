import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                username,
                password
            });

            if (response.status === 200) {
                const { token, userId } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                navigate('/dashboard');  // Redirect to dashboard after successful login
            } else {
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };


    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            {loginStatus && <p>{loginStatus}</p>}
        </div>
    );
}

export default LoginPage;
