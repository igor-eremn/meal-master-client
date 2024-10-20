import React, { useState } from 'react';
import './Calculator.css';
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";


const Calculator = ({ setDetails }) => {
  //TODO: why not calculating after first click
  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(1);
  const [weight, setWeight] = useState(2.5);
  const [height, setHeight] = useState(30);
  const [activity, setActivity] = useState(1);
  const [calcResult, setCalcResult] = useState('Result will be here...');

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    console.log("🚀 ~ calculateBMR ~ w:", w);
    console.log("🚀 ~ calculateBMR ~ h:", h);
    console.log("🚀 ~ calculateBMR ~ a:", a);
    

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
  
    const protein = macros.protein.toFixed(2);
    const carbs = macros.carbs.toFixed(2);
    const fats = macros.fats.toFixed(2);
  
    const resultString = 
      `BMR: ${bmr.toFixed(2)} calories/day\n` +
      `TDEE: ${tdee.toFixed(2)} calories/day\n` +
      `Macros:\n` +
      `Protein: ${protein}g\n` +
      `Carbs: ${carbs}g\n` +
      `Fats: ${fats}g`;
  
    setCalcResult(resultString);
  
    const details = { bmr, tdee, macros, protein, carbs, fats };
    setDetails(details);
  };
  

  return (
    <div className={`calculator ${isOpen ? 'open' : ''}`}>
      <div className="calculator-header" onClick={() => setIsOpen(!isOpen)}>
        <span>CALCULATOR</span>
        <button className="toggle-button">{isOpen ? <FaLongArrowAltDown /> : <FaLongArrowAltUp />}</button>
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
                  onChange={(e) => {setAge(e.target.value)}}
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
                  onChange={(e) => {setHeight(e.target.value)}}
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
                  onChange={(e) => {setWeight(e.target.value)}}
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
          <textarea 
            className="calculator-result-area"
            value={calcResult}
            disabled={true}
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default Calculator;
