import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [userInput, setUserInput] = useState(sessionStorage.getItem('userInput') || '');
  const [aiResponse, setAiResponse] = useState(sessionStorage.getItem('aiResponse') || 'AI response will appear here.');

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
    <div className="home-container">
      <div className="grid-container">
        <div className="input-column">
          <div className="input-header">
            <h3 className="column-title">User Input</h3>
            <button className="ask-ai-button" onClick={askAI}>Ask AI</button>
          </div>
          <textarea 
            className="input-area"
            placeholder="Enter your text here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>
        <div className="response-column">
          <div className="input-header">
            <h3 className="column-title">AI Response</h3>
          </div>
          <textarea 
            className="input-area"
            placeholder="Enter your text here..."
            value={aiResponse}
            disabled={true}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Home;
