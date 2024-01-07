import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './NEW_LOGO.png';
import CategoryBox from './CategoryBox';
import axios from 'axios';

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

  const formatCategoryDataForPrompt = () => {
    let promptData = '';
    for (const [category, data] of Object.entries(categoryData)) {
      promptData += `${category.replace('_', ' ').toUpperCase()}: `;
      data.events.forEach((event, index) => {
        promptData += `Event ${index + 1}: ${JSON.stringify(event)}; `;
      });
      promptData += '\n';
    }
    return promptData;
  };

  useEffect(() => {
    if (plan && selectedMajor === 'Computer Science') {
      navigate('/Computer-Science', { state: { plan } });
    }
  }, [plan, selectedMajor, navigate]);

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

  let retryDelay = 1000;

  async function generatePlan() {
    setIsLoading(true);

  const categoryDataForPrompt = formatCategoryDataForPrompt();
    const promptText = 
    `For a student aiming to study ${selectedMajor}, with the following activities:\n${categoryDataForPrompt}\nGenerate a tailored plan to enhance their college application.`;
  
    try {
      const response = await axios.post("https://api.openai.com/v1/completions", {
        model: "text-davinci-003",
        prompt: promptText,
        temperature: 0.5,
        max_tokens: 150
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        }
      });
  
      if (response.data.choices?.[0]?.text) {
        let formattedPlan = response.data.choices[0].text.trim().replace(/([0-9]+\.) /g, '\n$1 ');
        setPlan(formattedPlan);
      } else {
        throw new Error("Unexpected response structure from OpenAI");
      }
      retryDelay = 1000;
    } catch (error) {
      if (error.message.includes("429")) {
        console.log(`Retrying in ${retryDelay}ms`);
        setTimeout(generatePlan, retryDelay);
        retryDelay *= 2;
      } else {
        console.error("Error fetching data:", error);
      }
    } finally {
      setIsLoading(false);
    }
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
        />

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