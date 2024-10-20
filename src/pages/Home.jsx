// Home.js
import React, { useState, useEffect } from 'react';
import './Home.css';
import Calculator from '../components/calc-side/calculator/Calculator';
import CalcInfo from '../components/calc-side/info/CalcInfo';
import DietPref from '../components/diet-preference/DietPref';
import ParamChecker from '../components/param-checker/ParamChecker';

const Home = () => {
  const [userInput, setUserInput] = useState(sessionStorage.getItem('userInput') || '');
  const [aiResponse, setAiResponse] = useState(sessionStorage.getItem('aiResponse') || 'Your diet will be here...');
  const [calculatorResult, setCalculatorResult] = useState('');
  const [calculatorResultDetails, setCalculatorResultDetails] = useState(null);
  const [weightGoal, setWeightGoal] = useState('');
  const [timeline, setTimeline] = useState('');
  const [dietPref, setDietPref] = useState(['']);

  useEffect(() => {
    sessionStorage.setItem('userInput', userInput);
  }, [userInput]);

  useEffect(() => {
    sessionStorage.setItem('aiResponse', aiResponse);
  }, [aiResponse]);

  useEffect(() => {
    console.log(calculatorResult);
    console.log(calculatorResultDetails);
  }, [calculatorResult, calculatorResultDetails]);

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

  const goalSet = weightGoal && timeline; 
  const dietSet = dietPref.length > 0 && dietPref[0] !== '';
  const calculatorSet = calculatorResultDetails !== null;

  return (
    <div className="home-page-container">
      <div className="home-page-left-sidebar">
        <CalcInfo />
        <Calculator setDetails={setCalculatorResultDetails} />
      </div>
      <div className="home-page-main-content">
        <h3 className="home-page-goal-title">Your Goal</h3>
        <div className="home-page-input-row">
          <div className="home-page-input-group">
            <div className="input-label-container">
              <label>Weight Goal (kg):</label>
              <input type="number" value={weightGoal} onChange={(e) => setWeightGoal(e.target.value)} />
            </div>
          </div>

          <div className="home-page-input-group">
            <div className="input-label-container">
              <label>Timeline (days):</label>
              <input type="number" value={timeline} onChange={(e) => setTimeline(e.target.value)} />
            </div>
          </div>
        </div>

        
        <div className="diet-pref-container">
          <DietPref setDiet={setDietPref}/>
          <ParamChecker goal={goalSet} dietPref={dietSet} calculator={calculatorSet} />
        </div>
        
        <button className="home-page-ask-ai-button" onClick={askAI}>What's my diet then?</button>
        <textarea 
          className="home-page-input-area"
          placeholder="Enter your text here..."
          value={aiResponse}
          disabled={true}
        ></textarea>
      </div>
      <div className="home-page-right-sidebar">
      </div>
    </div>
  );
}

export default Home;
