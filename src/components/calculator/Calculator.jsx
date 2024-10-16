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
  const [result, setResult] = useState('');

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (gender === 'male') {
      return 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      return 10 * w + 6.25 * h - 5 * a - 161;
    }
  };

  const calculateTDEE = (bmr) => {
    const activityFactors = [1.2, 1.375, 1.55, 1.725, 1.9];
    return bmr * activityFactors[activity - 1];
  };

  const calculateMacros = (tdee) => {
    const protein = (tdee * 0.25) / 4;
    const carbs = (tdee * 0.55) / 4;
    const fats = (tdee * 0.2) / 9;
    return { protein, carbs, fats };
  };

  const handleCalculate = () => {
    const bmr = calculateBMR();
    const tdee = calculateTDEE(bmr);
    const macros = calculateMacros(tdee);

    setResult(
      `BMR: ${bmr.toFixed(2)} calories/day\n` +
      `TDEE: ${tdee.toFixed(2)} calories/day\n` +
      `Macros:\n` +
      `Protein: ${macros.protein.toFixed(2)}g\n` +
      `Carbs: ${macros.carbs.toFixed(2)}g\n` +
      `Fats: ${macros.fats.toFixed(2)}g`
    );
  };

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

      <button onClick={handleCalculate} className="calculate-button">Calculate</button>

      <textarea 
        className="input-area"
        placeholder="Calculations will be here..."
        value={result}
        readOnly
      ></textarea>
    </div>
  );
};

export default Calculator;