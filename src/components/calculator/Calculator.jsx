import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(1);
  const [weight, setWeight] = useState(2.5);
  const [height, setHeight] = useState(30);
  const [activity, setActivity] = useState(1);
  const [result, setResult] = useState(0);

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
        <button className="toggle-button">{isOpen ? 'X' : 'O'}</button>
      </div>
      {isOpen && (
        <div className="calculator-body">
          <div className="calculator-row">
            <div className="calculator-column">
              <div className={`input-group-1 ${gender === 'male' ? 'active' : ''}`}>
                <button
                  className={`gender-button`}
                  onClick={() => setGender('male')}
                >
                  MEN
                </button>
              </div>
              <div className="input-group-1">
  <label>AG:</label>
  <input
    type="number"
    value={age}
    onChange={(e) => {
      const value = Math.max(1, Math.min(100, Number(e.target.value))); // Enforce 1 <= value <= 100
      setAge(value);
    }}
    min={1}
    max={100}
  />
  <span>YR</span>
</div>
<div className="input-group-1">
  <label>HT:</label>
  <input
    type="number"
    value={height}
    onChange={(e) => {
      const value = Math.max(0, Math.min(300, Number(e.target.value)));
      setHeight(value);
    }}
    min={0}
    max={300}
  />
  <span>CM</span>
</div>
<div className="input-group-1">
  <label>WT:</label>
  <input
    type="number"
    value={weight}
    onChange={(e) => {
      const value = Math.max(2.5, Math.min(300, Number(e.target.value)));
      setWeight(value);
    }}
    min={2.5}
    max={300}
  />
  <span>KG</span>
</div>

            </div>

            <div className="calculator-column">
              <div className={`input-group-1 ${gender === 'female' ? 'active' : ''}`}>
                <button
                  className={`gender-button`}
                  onClick={() => setGender('female')}
                >
                  WOMEN
                </button>
              </div>
              <div className="input-group-2">
                <label>ACTIVE LVL</label>
              </div>
              <div className="input-group-2">
                <div className="activity-grid">
                  {[1, 2].map((level) => (
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
              <div className="input-group-2">
                <div className="activity-grid">
                  {[3, 4].map((level) => (
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
          </div>

          <button className="calculate-button" onClick={handleCalculate}>
            CALCULATE
          </button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
