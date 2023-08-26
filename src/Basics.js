import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './favicon.ico';
import CategoryBox from './CategoryBox';
import axios from 'axios';

function Basics() {
  const navigate = useNavigate();
  const [selectedMajor, setSelectedMajor] = useState('');

  const [categoryData, setCategoryData] = useState({ 
    volunteering: { showForm: true, events: [{}] }, 
    internships: {showForm: true, events: [{}]},
    pet_projects: { showForm: true, events: [{}] }, 
    research_projects: {showForm: true, events: [{}]},
    jobs: { showForm: true, events: [{}] }, 
    hackathons: {showForm: true, events: [{}]},
    additional_information: {showForm: true, events: [{}]}
   });

   const gatherUserInputs = () => {
    return {
        volunteering: categoryData.volunteering.events,
        internships: categoryData.internships.events,
        pet_projects: categoryData.pet_projects.events,
        research_projects: categoryData.research_projects.events,
        jobs: categoryData.jobs.events,
        hackathons: categoryData.hackathons.events,
        additional_information: categoryData.additional_information.events
        };
    };

    const createPrompt = (userInputs) => {
        // Convert userInputs into a string format suitable for your OpenAI prompt
        // This will depend on exactly what kind of question or statement you want to send to the OpenAI API
        // Example:
        return `Please generate a plan for a student with the following activities: ${JSON.stringify(userInputs)}`;
      };

   const handleClick = async () => {

    const userInputs = gatherUserInputs();
    let plan = '';

    try {
        const prompt = createPrompt(userInputs);
        const response = await axios.post('/api/generate-activites', { prompt: prompt });
  
        plan = response.data.choices[0].text; // You may need to adjust the response structure based on your server's response
      } catch (error) {
        console.error('Error generating plan:', error);
        if (error.response) {
          console.log('Response:', error.response.data);
        } else if (error.request) {
          console.log('Request:', error.request);
        } else {
          console.log('Message:', error.message);
        }
      }      
  
      switch (selectedMajor) {
        case 'Computer Science':
          navigate('/Computer-Science', { state: { plan } });
          break;
        default:
          break;
      }
   }

  function addCategory(category) {
    setCategoryData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        showForm: true, 
        events: [...prevData[category].events, {}]
      },
    }));
  }

  function handleInputChange(category, eventIndex, field, value) {
    setCategoryData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        events: prevData[category].events.map((event, index) => {
          if (index === eventIndex) {
            return { ...event, [field]: value };
          }
          return event;
        }),
      },
    }));
  }

  function handleAddEvent(category) {
    setCategoryData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        events: [...prevData[category].events, {}],
      },
    }));
  }

  function handleRemoveEvent(category, eventIndex) {
    setCategoryData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        events: prevData[category].events.filter(
          (_, index) => index !== eventIndex
        ),
      },
    }));
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

      <h2 id='lets-basics'>Let's start with basics</h2>
        <div className="category-container">
        <div className="category-box">
            <h3 id='basics-title'>Major</h3>
            <select 
              value={selectedMajor}
              onChange={(e) => setSelectedMajor(e.target.value)}
            >
            <option value="">Select a major</option>
            <option value="Computer Science">Computer Science</option>
            </select>
        </div>
        </div>

        <CategoryBox 
            category="Volunteering" 
            data={categoryData.volunteering} 
            handleInputChange={handleInputChange}
            handleAddEvent={handleAddEvent}
            handleRemoveEvent={handleRemoveEvent}
            addCategory={addCategory}
        />

        <CategoryBox 
            category="Internships" 
            data={categoryData.internships} 
            handleInputChange={handleInputChange}
            handleAddEvent={handleAddEvent}
            handleRemoveEvent={handleRemoveEvent}
            addCategory={addCategory}
        />

        <CategoryBox 
            category="Pet_Projects"
            data={categoryData.pet_projects} 
            handleInputChange={handleInputChange}
            handleAddEvent={handleAddEvent}
            handleRemoveEvent={handleRemoveEvent}
            addCategory={addCategory}
        />

        <CategoryBox 
            category="Research_Projects" 
            data={categoryData.research_projects} 
            handleInputChange={handleInputChange}
            handleAddEvent={handleAddEvent}
            handleRemoveEvent={handleRemoveEvent}
            addCategory={addCategory}
        />

        <CategoryBox 
            category="Jobs" 
            data={categoryData.jobs} 
            handleInputChange={handleInputChange}
            handleAddEvent={handleAddEvent}
            handleRemoveEvent={handleRemoveEvent}
            addCategory={addCategory}
        />

        <CategoryBox 
            category="Hackathons" 
            data={categoryData.hackathons} 
            handleInputChange={handleInputChange}
            handleAddEvent={handleAddEvent}
            handleRemoveEvent={handleRemoveEvent}
            addCategory={addCategory}
        />

        <CategoryBox 
            category="Additional_Information" 
            data={categoryData.additional_information} 
            handleInputChange={handleInputChange}
            handleAddEvent={handleAddEvent}
            handleRemoveEvent={handleRemoveEvent}
            addCategory={addCategory}
        />

      <button 
        onClick={handleClick}
        id="generate-activities"
      >
        Generate Activities
      </button>
    </div>
  );
}

export default Basics;