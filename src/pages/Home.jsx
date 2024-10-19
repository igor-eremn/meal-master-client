import React, { useState, useEffect } from 'react';
import './Home.css';
import Calculator from '../components/calculator/Calculator';
import DietPref from '../components/diet-preference/DietPref';

const Home = () => {
  const [userInput, setUserInput] = useState(sessionStorage.getItem('userInput') || '');
  const [aiResponse, setAiResponse] = useState(sessionStorage.getItem('aiResponse') || 'Your diet will be here...');

  const [weightGoal, setWeightGoal] = useState('');
  const [timeline, setTimeline] = useState('');

  useEffect(() => {
    sessionStorage.setItem('userInput', userInput);
  }, [userInput]);

  useEffect(() => {
    sessionStorage.setItem('aiResponse', aiResponse);
  }, [aiResponse]);

  const askAI = async () => {
    if (!userInput.trim()) {
      alert('Please enter some text before asking AI.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/generate-custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setAiResponse('An error occurred while fetching the AI response.');
    }
  };

  return (
    <div className="home-page-container">
      <div className="home-page-left-sidebar">
        <Calculator />
      </div>
      <div className="home-page-main-content">
        <h3 className="home-page-goal-title">Your Goal</h3>
        <div className="home-page-input-row">
          <div className="home-page-input-group">
            <label>Weight Goal (kg):</label>
            <input type="number" value={weightGoal} onChange={(e) => setWeightGoal(e.target.value)} />
          </div>
          
          <div className="home-page-input-group">
            <label>Timeline (days):</label>
            <input type="number" value={timeline} onChange={(e) => setTimeline(e.target.value)} />
          </div>
        </div>
        <DietPref />
        <button className="home-page-ask-ai-button" onClick={askAI}>What's my diet then?</button>
        <textarea 
          className="home-page-input-area"
          placeholder="Enter your text here..."
          value={aiResponse}
          disabled={true}
        ></textarea>
      </div>
      <div className="home-page-right-sidebar">
        {/* Right sidebar content */}
      </div>
    </div>
  );
}

export default Home;
