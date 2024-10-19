import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState(1);
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
    const activityFactors = [1.2, 1.375, 1.55, 1.725];
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
    <div className={`calculator ${isOpen ? 'open' : ''}`}>
      <div className="calculator-header" onClick={() => setIsOpen(!isOpen)}>
        <span>CALCULATOR</span>
        <button className="toggle-button">{isOpen ? '−' : '□'}</button>
      </div>
      {isOpen && (
        <div className="calculator-body">
          <div className="calculator-row">
            <button className={`gender-button ${gender === 'male' ? 'active' : ''}`} onClick={() => setGender('male')}>MEN</button>
            <button className={`gender-button ${gender === 'female' ? 'active' : ''}`} onClick={() => setGender('female')}>WOMEN</button>
          </div>
          <div className="calculator-row">
            <div className="input-group">
              <label>AG:</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
              <span>YR</span>
            </div>
          </div>
          <div className="calculator-row">
            <div className="input-group">
              <label>HT:</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
              <span>CM</span>
            </div>
          </div>
          <div className="calculator-row">
            <div className="input-group">
              <label>WT:</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
              <span>KG</span>
            </div>
          </div>
          <div className="calculator-row">
            <div className="activity-group">
              <label>ACTIVE LVL</label>
              <div className="activity-buttons">
                {[1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    className={`activity-button ${activity === level ? 'active' : ''}`}
                    onClick={() => setActivity(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button className="calculate-button" onClick={handleCalculate}>CALCULATE</button>
        </div>
      )}
    </div>
  );
};

export default Calculator;