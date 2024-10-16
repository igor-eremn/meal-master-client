import React, { useState } from 'react';
import './Calculator.css';

import manIcon from '../../assets/man-icon.png';
import womanIcon from '../../assets/woman-icon.png';
import activity1Icon from '../../assets/al-1.png';
import activity2Icon from '../../assets/al-2.png';
import activity3Icon from '../../assets/al-3.png';
import activity4Icon from '../../assets/al-4.png';
import activity5Icon from '../../assets/al-5.png';

const Calculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState(1);
  const [weightGoal, setWeightGoal] = useState('');
  const [timeline, setTimeline] = useState('');

  return (
    <div className="calculator">
      <div className="gender-selection">
        <img
          src={manIcon}
          alt="Male"
          className={`gender-icon ${gender === 'male' ? 'selected' : ''}`}
          onClick={() => setGender('male')}
        />
        <img
          src={womanIcon}
          alt="Female"
          className={`gender-icon ${gender === 'female' ? 'selected' : ''}`}
          onClick={() => setGender('female')}
        />
      </div>
      
      <div className="input-row">
        <div className="input-group">
          <label>Age (years):</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        
        <div className="input-group">
          <label>Weight (kg):</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        
        <div className="input-group">
          <label>Height (cm):</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
      </div>
      
      <div className="activity-selection">
        {[activity1Icon, activity2Icon, activity3Icon, activity4Icon, activity5Icon].map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt={`Activity ${index + 1}`}
            className={`activity-icon ${activity === index + 1 ? 'selected' : ''}`}
            onClick={() => setActivity(index + 1)}
          />
        ))}
      </div>
      
      <div className="input-row">
        <div className="input-group">
          <label>Weight Goal (kg):</label>
          <input type="number" value={weightGoal} onChange={(e) => setWeightGoal(e.target.value)} />
        </div>
        
        <div className="input-group">
          <label>Timeline (days):</label>
          <input type="number" value={timeline} onChange={(e) => setTimeline(e.target.value)} />
        </div>
      </div>

      <textarea 
            className="input-area"
            placeholder="Calculations will be here..."
            value={""}
            disabled={true}
        ></textarea>
    </div>
  );
};

export default Calculator;