import React from 'react';
import { useNavigate } from 'react-router-dom';

// This component provides a login form for existing users.
function LoginPage() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        
        // Here, you'd typically make an API call to your backend to authenticate the user.
        // If successful, navigate to the dashboard or another page.
        // If not, show an error message.
        
        // For demonstration purposes, let's assume the login is always successful:
        navigate('/dashboard');  // Redirect to dashboard after login
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
