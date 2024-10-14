import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="page-title">Home Page</h2>
      <div className="grid-container">
        <div className="input-column">
          <h3 className="column-title">User Input</h3>
          <textarea 
            className="input-area"
            placeholder="Enter your text here..."
          ></textarea>
        </div>
        <div className="response-column">
          <h3 className="column-title">AI Response</h3>
          <div className="response-area">
            <p>AI response will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;