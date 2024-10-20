import React, { useState } from 'react';
import './CalcInfo.css';

const CalcInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`calc-info ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="calc-info-body">
          
        </div>
      )}
      <div className="calc-info-header" onClick={() => setIsOpen(!isOpen)}>
        <span>CALCULATOR INFO</span>
        <button className="calc-info-toggle-button">{isOpen ? 'X' : 'O'}</button>
      </div>
    </div>
  );
};

export default CalcInfo;
