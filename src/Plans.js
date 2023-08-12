import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './favicon.ico';
import Loading from './Loading';

function Plans(){
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

    return(
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
      <h2>Plans</h2>
        <div class="plans-container">
            <div class="plan-box">
                <h3>Standard</h3>
                <lu>
                    <li>Personalized gap year plan based on your major and interests, considering your current projects.</li>
                    <li>Opportunity Recommendations:  list of opportunities that align with your field of study. However, detailed information and external links will not be included.</li>
                </lu>
                <button>Free</button>
            </div>
            <div class="plan-box">
                <h3>Premium</h3>
                <lu>
                    <li>All features of the Standard plan.</li>
                    <li>Detailed Event and Competition Information: Gain access to detailed information and external links for each recommended event or competition. This will allow you to have a deeper understanding of each opportunity and take informed action.</li>
                </lu>
                <button>$4.99</button>
            </div>
            <div class="plan-box">
                <h3>Elite</h3>
                <lu>
                    <li>All features of the Premium plan.</li>
                    <li>Exclusive Event Access: Gain priority access and early registration opportunities to exclusive events, workshops, and internships that are highly sought after in your field.</li>
                    <li>Application Assistance: Receive personalized assistance with applications for select opportunities, such as internships or competitive programs, including feedback on your application materials.</li>
                </lu>
                <button>$7.99</button>
            </div>
        </div>
    </div>
    )
}

export default Plans