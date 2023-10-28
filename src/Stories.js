import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './NEW_LOGO.png';
// import Loading from './Loading';

function Stories() {
  useEffect(() => {
    document.title = 'Stories - MyGapMentor';
  }, []);

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate loading
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // 2 seconds delay, adjust as needed
  // }, []);

  // // Show loading spinner if loading
  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div id="grad1" className="App">
        <div className="navbar">
          <div className="navbar-left">
          <div className="home-logo-group">
            <a href="/">
              <img src={logo} alt="Logo" className="navbar-logo" />
            </a>
            {/* <a href="/">MyGapMentor</a> */}
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
        <h2>Stories</h2>
        <div className="stories-container">
            <div className="story-card">
                <img src="/barack_columbia.jpg" alt="barack_columbia"/>
                <h3>Barack Obama</h3>
                <p>Columbia University</p>
            </div>
            <div className="story-card">
                <img src="/elon_upenn.jpg" alt="elon_upenn"/>
                <h3>Elon Musk</h3>
                <p>University of Pennsylvania</p>
            </div>
            <div className="story-card">
                <img src="/zuck_harvard.jpg" alt="zuck_harvard"/>
                <h3>Mark Zuckerberg</h3>
                <p>Harvard University</p>
            </div>
        </div>
    </div>
  );
}

export default Stories;
