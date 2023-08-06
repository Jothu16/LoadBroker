import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';  // Corrected path
import LoginPage from './LoginPage';      // Corrected path
import RegistrationPage from './RegistrationPage';  // Corrected path
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Router>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/home" component={HomePage} />
      </Router>
    </Router>
  );
}

export default App;
