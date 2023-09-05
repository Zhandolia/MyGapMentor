import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
import { Link } from 'react-router-dom';
import logo from './NEW_LOGO.png';
// import mp4File from './fungi.mp4';
// import Animation from './Animation';

function Home() {
    useEffect(() => {
        document.title = 'Home - MyGapMentor';
      }, []);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/basics');
    }

    const handleMajorSelection = (major) => {
        navigate(`/basics?major=${major}`);
      };

  return (
    <div id="grad1" className="App">
        {/* {< Animation />} */}
      {/* <video id="videoBackground" autoPlay loop muted>
        <source src={mp4File} type="video/mp4" />
      </video> */}

      <div id="navbar" className="navbar">
        <div className="navbar-left">
          <div className="home-logo-group">
            <a href="/">
              <img src={logo} alt="Logo" className="navbar-logo" />
            </a>
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

        <h2 className='maximize-h2'>
        Long-Term Planning for Your <span className='highlighted'>Academic Future </span>
        </h2>

        <div className='button-container'>
        <button className="big-button" onClick={handleClick}>Get Started</button>
        </div>

        <h3 className='transform-h3'>
        Transform your academic journey with our AI-driven mentorship platform. MyGapMentor's OpenAI database is fully-managed, student-friendly, and easily customizable to fit your extracurricular needs.
        </h3>

        <div className="major-container">

            <div className="major-button" onClick={() => handleMajorSelection("Computer Science")}>
                Computer Science
            </div>
            <div className="major-button" onClick={() => handleMajorSelection("Engineering")}>
                Engineering
            </div>
            <div className="major-button" onClick={() => handleMajorSelection("Business")}>
                Business
            </div>
            <div className="major-button" onClick={() => handleMajorSelection("Biology")}>
                Biology
            </div>
            <div className="major-button" onClick={() => handleMajorSelection("Psychology")}>
                Psychology
            </div>
            <div className="major-button" onClick={() => handleMajorSelection("Arts")}>
                Arts
            </div>
        </div>

    </div>
  );
}

export default Home;
