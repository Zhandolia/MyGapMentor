import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './NEW_LOGO.png';
import CategoryBox from './CategoryBox';

async function Basics() {

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMajor, setSelectedMajor] = useState('');
  const [plan, setPlan] = useState("");
  const [internship, setInternship] = useState("");
  const [hackathon, setHackathon] = useState("");
  const [volunteering, setVolunteering] = useState("");
  const [pet_projects, setPetProjects] = useState("");
  const [jobs, setJobs] = useState("");
  const [additional_information, setAdditional] = useState("");

  const promptText = 
  `For a student aiming to study ${selectedMajor}, 
  with internship experience in: ${internship}, 
  participation in hackathons like: ${hackathon}, 
  and achievements in jobs such as: ${jobs}, 
  along with engaging in volunteering events like: ${volunteering}, 
  and putting effort into personal projects such as: ${pet_projects}.
  Generate a tailored personal plan to enhance their college application.`;

  useEffect(() => {
    if (location.state && location.state.selectedMajor) {
      setSelectedMajor(location.state.selectedMajor);
    }
    document.title = 'Basics - MyGapMentor';
  }, [location.state]);

    switch (selectedMajor) {
        case 'Computer Science':
            navigate('/Computer-Science', { state: { plan } });
            break;
        default:
            break;
    }

    async function generatePlan() {
    setIsLoading(true);

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": promptText,
      "temperature": 0.5,
      "max_tokens": 150
    };

    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify(APIBody)
    })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      setPlan(data.choices[0].text.trim());
      setIsLoading(false);
    })
    .then((data) => {
      let formattedPlan = data.choices[0].text.trim().replace(/([0-9]+\.) /g, '\n$1 ');
      setPlan(formattedPlan);
      setIsLoading(false);
    });
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