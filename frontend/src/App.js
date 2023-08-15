import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import TruckDataManagement from './components/TruckDataManagement'; // Import the new component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/truckdatamanagement" element={<TruckDataManagement />} /> {/* New route for TruckDataManagement */}
      </Routes>
    </Router>
  );
}

export default App;
