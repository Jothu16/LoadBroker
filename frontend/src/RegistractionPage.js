import React from 'react';

// This component provides a registration form for new users.
function RegistrationPage() {
    return (
        <div className="registration-page">
            <h2>Register</h2>
            <form>
                {/* Input fields for username, password, and email */}
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input type="email" placeholder="Email" />
                {/* Registration button */}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
