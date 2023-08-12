import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './favicon.ico';
import Loading from './Loading';

function Account() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegistrationChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login form submission
    console.log('Login Form Submitted:', loginData);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // Handle registration form submission
    console.log('Registration Form Submitted:', registrationData);
  };

  const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
        setLoading(false);
        }, 1000); // 2 seconds delay, adjust as needed
    }, []);

    // Show loading spinner if loading
    if (loading) {
        return <Loading />;
    }

  return (
    <div id="grad1" className="App">
      <div className="navbar">
        <div className="navbar-left">
        <div className="home-logo-group">
          <a href="/">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </a>
          <a href="/">MyGapMentor</a>
        </div>
        </div>
        <div className="navbar-center">
          <a href="about">About us</a>
          <a href="stories">Success Stories</a>
          <a href="plans">Plans</a>
          <a href="contact">Contact us</a>
        </div>

        <div className="navbar-right">
          <a href="account">Account</a>
        </div>
      </div>
      <h2 id='account-title'>Account</h2>
      <div className="form-container">
        <h3>Login</h3>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="Email" required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Password" required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="form-container">
        <h3>Registration</h3>
        <form onSubmit={handleRegistrationSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={registrationData.name}
              onChange={handleRegistrationChange}
              placeholder="Name" required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={registrationData.email}
              onChange={handleRegistrationChange}
              placeholder="Email" required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={registrationData.password}
              onChange={handleRegistrationChange}
              placeholder="Password" required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Account;
