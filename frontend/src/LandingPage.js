import React from "react";

// This is the landing page component.
function LandingPage() {
  return (
    <div className="landing-page">
      {/* Displaying the main title */}
      <h1>Welcome to AI Load Broker</h1>
      {/* Brief description */}
      <p>Your one-stop solution for freight management.</p>
      {/* Call to action buttons for registration and login */}
      <div className="cta-buttons">
        <button>Register</button>
        <button>Login</button>
      </div>
    </div>
  );
}

export default LandingPage;
