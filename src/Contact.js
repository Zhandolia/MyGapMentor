// import React from 'react';
// import './App.css';
// import logo from './favicon.ico';

// function Contact() {
//   return (
//       <div id="grad1" className="App">
//           <div className="navbar">
//             <div className="navbar-left">
//             <div className="home-logo-group">
//               <a href="/">
//                 <img src={logo} alt="Logo" className="navbar-logo" />
//               </a>
//               <a href="/">MyGapMentor</a>
//             </div>
//           </div>
//             <div className="navbar-center">
//               <a href="about">About us</a>
//               <a href="stories">Success Stories</a>
//               <a href="plans">Plans</a>
//               <a href="contact">Contact us</a>
//             </div>

//             <div className="navbar-right">
//             <a href="account">Account</a>
//         </div>
//           </div>
//           <h2>Contact us</h2>
//           <div className="contact-container">
//               <h4>Feel free to email us at:</h4>
//               <p>mygapmentor@gmail.com</p>
//               <h4>Or, you can leave a message below:</h4>
//               <form className="contact-form">
//                   <input type="text" name="name" placeholder="Your name" required />
//                   <input type="email" name="email" placeholder="Your email" required />
//                   <textarea name="message" placeholder="Your message" required></textarea>
//                   <button type="submit">Send Message</button>
//               </form>
//           </div>
//       </div>
//   );
// }

// export default Contact;

import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './favicon.ico';
import Loading from './Loading'; // Import the Loading component

function Contact() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay, adjust as needed
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
          <h2>Contact us</h2>
          <div className="contact-container">
              <h4>Feel free to email us at:</h4>
              <p>mygapmentor@gmail.com</p>
              <h4>Or, you can leave a message below:</h4>
              <form className="contact-form">
                  <input type="text" name="name" placeholder="Your name" required />
                  <input type="email" name="email" placeholder="Your email" required />
                  <textarea name="message" placeholder="Your message" required></textarea>
                  <button type="submit">Send Message</button>
              </form>
          </div>
      </div>
  );
}

export default Contact;
