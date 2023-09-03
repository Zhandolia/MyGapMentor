import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import logo from './NEW_LOGO.png';
import movFile from './fungi.mov';

function Home() {
  return (
    <div id="grad1" className="App">
      {/* Add this video tag */}
      <video id="videoBackground" autoPlay loop muted>
        <source src={`${process.env.PUBLIC_URL}/fungi.mov`} type="video/quicktime" />
      </video>

      <div id="navbar" className="navbar">
        <div className="navbar-left">
          <div className="home-logo-group">
            <a href="/">
              <img src={logo} alt="Logo" className="navbar-logo" />
            </a>
            {/* <a href="/"></a> */}
          </div>
        </div>
        <div className="navbar-center">
          <a href="about">Company</a>
          <a href="stories">Stories</a>
          <a href="plans">Pricing</a>
          <a href="contact">Contact</a>
        </div>

        <div className="navbar-right">
          <a href="account">Account</a>
        </div>
      </div>

      <h2>Welcome to MyGapMentor</h2>
      <h3 id='gateway'>Your Gateway to Maximizing Your Gap Year Potential!</h3>

      <div className='basicdiv'>
        <a href="/basics" className="big-button-link">
          <button className="big-button">Ready to Start Planning Your Resume with us? Click Here!</button>
        </a>
        <Link to="about" className="learn-about-button">Learn more About us &#8594;</Link>
        <Link to="plans" className="learn-plans-button">Get to know our Plans &#8594;</Link>
        <h3 className="nFac">Powered by nFactorial 2023</h3>
      </div>
    </div>
  );
}

export default Home;
