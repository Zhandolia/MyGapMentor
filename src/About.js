import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './NEW_LOGO.png';
// import Loading from './Loading';

function About(){
  useEffect(() => {
    document.title = 'About - MyGapMentor';
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

  return(
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
    <h2>Company</h2>
      <ul className="about-list">
      <li>We're here to help you make the most of your gap year by creating a personalized plan tailored to your major and interests.</li>
      <li>Our polished AI algorithm will guide you through a range of events and opportunities, such as hackathons, internships, research projects, volunteering events, and more, to enhance your application.</li>
      <li>With our strategic approach and consideration of your current projects, we'll ensure your gap year is a transformative experience, setting you up for success in your academic journey.</li>
      <li>Join us at MyGapMentor.com and unlock a world of possibilities for your future!</li>
      </ul>
  </div>
  
  )
}

export default About