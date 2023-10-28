import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './NEW_LOGO.png';
import CategoryBox from './CategoryBox';

const API_KEY = "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";

function Basics() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMajor, setSelectedMajor] = useState('');
  const [plan, setPlan] = useState('');
  const [categoryData, setCategoryData] = useState({
    volunteering: { events: [] },
    internships: { events: [] },
    pet_projects: { events: [] },
    research_projects: { events: [] },
    olympiads: { events: [] },
    hackathons: { events: [] },
    additional_information: { events: [] }
  });

  useEffect(() => {
    if (location.state && location.state.selectedMajor) {
      setSelectedMajor(location.state.selectedMajor);
    }
    document.title = 'Basics - MyGapMentor';
  }, [location.state]);

  async function generatePlan() {
    setIsLoading(true);

    const internship = categoryData.internships.events.join(", ");
    const hackathon = categoryData.hackathons.events.join(", ");
    const olympiad = categoryData.olympiads.events.join(", ");

    // const promptText = 
    // `For a student aiming to study ${selectedMajor}, 
    // with internship experience in: ${internship}, 
    // participation in hackathons like: ${hackathon}, 
    // and achievements in olympiads such as: ${olympiad}. 
    // Generate a tailored personal plan to enhance their college application.`;
    const promptText = 
    `For a student aiming to study ${selectedMajor}, 
    please generate a tailored personal plan to enhance their college application.`;

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
      if (!data.ok) {
        throw new Error(`Error from OpenAI: ${data.status} ${data.statusText}`);
      }
      return data.json();
    })

    .then((data) => {
      if(data.choices && data.choices[0] && data.choices[0].text) {
        let formattedPlan = data.choices[0].text.trim().replace(/([0-9]+\.) /g, '\n$1 ');
        setPlan(formattedPlan);
      } else {
        throw new Error("Unexpected response structure from OpenAI");
      }
      setIsLoading(false);
    })
    
    .catch((error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    })

    switch (selectedMajor) {
      case 'Computer Science':
          navigate('/Computer-Science', { state: { plan } });
          break;
      default:
          alert('The selected major is not supported yet.');
          break;
    }
  }

  // function addCategory(category) {
  //   setCategoryData((prevData) => ({
  //     ...prevData,
  //     [category]: {
  //       ...prevData[category],
  //       showForm: true, 
  //       events: [...prevData[category].events, {}]
  //     },
  //   }));
  // }

  // function handleInputChange(category, eventIndex, field, value) {
  //   setCategoryData((prevData) => ({
  //     ...prevData,
  //     [category]: {
  //       ...prevData[category],
  //       events: prevData[category].events.map((event, index) => {
  //         if (index === eventIndex) {
  //           return { ...event, [field]: value };
  //         }
  //         return event;
  //       }),
  //     },
  //   }));
  // }

  // function handleAddEvent(category) {
  //   setCategoryData((prevData) => ({
  //     ...prevData,
  //     [category]: {
  //       ...prevData[category],
  //       events: [...prevData[category].events, {}],
  //     },
  //   }));
  // }

  // function handleRemoveEvent(category, eventIndex) {
  //   setCategoryData((prevData) => ({
  //     ...prevData,
  //     [category]: {
  //       ...prevData[category],
  //       events: prevData[category].events.filter(
  //         (_, index) => index !== eventIndex
  //       ),
  //     },
  //   }));
  // }

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
            <a href="about">Company</a>
            <a href="stories">Stories</a>
            <a href="plans">Pricing</a>
            <a href="contact">Contact</a>
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
        <div>
{/* 
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
            category="Olympiads" 
            data={categoryData.olympiads} 
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
        /> */}


</div>
      <button 
        onClick={generatePlan}
        id="generate-activities"
      >
        Generate Activities
      </button>
    </div>
  );
}

export default Basics;