import React, { useState } from 'react';
import './CalcInfo.css';
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

const CalcInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`calc-info ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="calc-info-body">
          <div className="calc-info-row">
            <div className="calc-info-column">
              <div className="input-group-2">
                <label>BMR = Basal Metabolic Rate</label>
              </div>
              <div className="input-group-2">
                <label>Calculator uses Mifflin-St Jeor formula (BMR)</label>
              </div>
              <div className="input-group-2">
                <label>TDEE = Total Daily Energy Expenditure</label>
              </div>
              <div className="input-group-2">
                <label>TDEE is based on BMR and Activity level</label>
              </div>
              <div className="input-group-2">
                <label>Macros are needed for balanced diet</label>
              </div>
              <div className="input-group-2">
                <label>- Protein 20-30% of TDEE</label>
              </div>
              <div className="input-group-2">
              <label>- Carbs 45-65% of TDEE</label>
              </div>
              <div className="input-group-2">
                <label>- Fats 20-35% of TDEE</label>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="calc-info-header" onClick={() => setIsOpen(!isOpen)}>
        <span>CALCULATOR INFO</span>
        <button className="calc-info-toggle-button">{isOpen ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}</button>
      </div>
    </div>
  );
};

export default CalcInfo;
