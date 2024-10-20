import React, { useState } from 'react';
import './ResultInfo.css';

const ResultInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`res-info ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="res-info-body">
          
        </div>
      )}
      <div className="res-info-header" onClick={() => setIsOpen(!isOpen)}>
        <button className="res-info-toggle-button">{isOpen ? 'X' : 'O'}</button>
        <span>ABOUT RESULTS</span>
      </div>
    </div>
  );
};

export default ResultInfo;
