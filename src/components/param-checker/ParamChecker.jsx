import React from 'react';
import './ParamChecker.css';

const ParamChecker = ({ goal, dietPref, calculator }) => {
  const checkStatus = (isSet) => {
    return isSet ? '✔️' : '❌';
  };

  return (
    <div className="param-checker">
      <h4>Parameter Checker</h4>
      <div className="param-checker-item">
        <span>Your Goal: </span>
        <span className={goal ? 'green' : 'red'}>{checkStatus(goal)}</span>
      </div>
      <div className="param-checker-item">
        <span>Diet Preference: </span>
        <span className={dietPref ? 'green' : 'red'}>{checkStatus(dietPref)}</span>
      </div>
      <div className="param-checker-item">
        <span>Calculator: </span>
        <span className={calculator ? 'green' : 'red'}>{checkStatus(calculator)}</span>
      </div>
    </div>
  );
};

export default ParamChecker;
