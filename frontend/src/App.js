import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;
