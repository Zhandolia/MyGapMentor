// open ai
import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
// defaults
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
// pages
import Home from './home';
import About from './About';
import Stories from './Stories';
import Plans from './Plans';
import Contact from './Contact';
import Account from './Account';
import Basics from './Basics';
// majors
import ComputerScience from './Computer-Science';
import Biology from './Biology';
import BusinessAdministration from './Business-Administration';
import Chemistry from './Chemistry';
import Communications from './Communications';
import Economics from './Economics';
import Education from './Education';
import Engineering from './Engineering';
import English from './English';
import EnvironmentalScience from './Environmental-Science';
import FineArts from './Fine-Arts';
import History from './History';
import Journalism from './Journalism';
import Mathematics from './Mathematics';
import Music from './Music';
import Nursing from './Nursing';
import Physics from './Physics';
import PoliticalScience from './Political-Science';
import Psychology from './Psychology';
import Sociology from './Sociology';
// animation
import mp4File from './fungi.mp4';

function App() {
  // open ai
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios 
      .post("https://localhost:8080/chat", { prompt })
      .then((res)=>{ 
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // the rest 2.0
  const [categoryData, setCategoryData] = useState({});
  return (
    <BrowserRouter>
      <ScrollToTop />
      <video id="videoBackground" autoPlay loop muted>
        <source src={mp4File} type="video/quicktime" />
      </video>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="stories" element={<Stories />} />
        <Route path="plans" element={<Plans />} />
        <Route path="contact" element={<Contact />} />
        <Route path="account" element={<Account />} />
        <Route path="basics" element={<Basics categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="computer-science" element={<ComputerScience categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="biology" element={<Biology categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="business-administration" element={<BusinessAdministration categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="chemistry" element={<Chemistry categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="communications" element={<Communications categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="economics" element={<Economics categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="education" element={<Education categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="engineering" element={<Engineering categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="english" element={<English categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="environmental-science" element={<EnvironmentalScience categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="fine-arts" element={<FineArts categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="history" element={<History categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="journalism" element={<Journalism categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="mathematics" element={<Mathematics categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="music" element={<Music categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="nursing" element={<Nursing categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="physics" element={<Physics categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="political-science" element={<PoliticalScience categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="psychology" element={<Psychology categoryData={categoryData} setCategoryData={setCategoryData}/>} />
        <Route path="sociology" element={<Sociology categoryData={categoryData} setCategoryData={setCategoryData}/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
