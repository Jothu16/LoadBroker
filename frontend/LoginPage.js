import React from 'react';

// This component provides a login form for existing users.
function LoginPage() {
    return (
        <div className="login-page">
            <h2>Login</h2>
            <form>
                {/* Input fields for username and password */}
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                {/* Login button */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;