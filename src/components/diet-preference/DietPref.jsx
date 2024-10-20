import React, { useState, useEffect } from 'react';
import './DietPref.css';

import normalIcon from '../../assets/diet-pref/dt-1.png';
import veganIcon from '../../assets/diet-pref/dt-2.png';
import vegetarianIcon from '../../assets/diet-pref/dt-3.png';
import glutenFreeIcon from '../../assets/diet-pref/dt-4.png';
import dairyFreeIcon from '../../assets/diet-pref/dt-5.png';

const DietPref = ({ setDiet }) => {
  const [selectedDiets, setSelectedDiets] = useState(['']);

  const dietOptions = [
    { name: 'normal', icon: normalIcon },
    { name: 'vegan', icon: veganIcon },
    { name: 'vegetarian', icon: vegetarianIcon },
    { name: 'gluten-free', icon: glutenFreeIcon },
    { name: 'dairy-free', icon: dairyFreeIcon },
  ];

  const validCombinations = [
    ['normal'],
    ['vegan'],
    ['vegetarian'],
    ['dairy-free'],
    ['gluten-free'],
    ['vegan', 'gluten-free'],
    ['vegan', 'dairy-free'],
    ['vegetarian', 'dairy-free'],
    ['vegetarian', 'gluten-free'],
    ['dairy-free', 'gluten-free'],
    ['vegan', 'dairy-free', 'gluten-free'],
    ['vegetarian', 'dairy-free', 'gluten-free'],
  ];

  const isValidCombination = (diets) => {
    return validCombinations.some(combo => 
      combo.length === diets.length && combo.every(diet => diets.includes(diet))
    );
  };

  const toggleDiet = (dietName) => {
    setSelectedDiets(prevDiets => {
      let newDiets;
      if (prevDiets.includes(dietName)) {
        newDiets = prevDiets.filter(diet => diet !== dietName);
      } else {
        newDiets = [...prevDiets, dietName];
      }

      if (dietName === 'normal') {
        newDiets = ['normal'];
      } else if (newDiets.includes('normal')) {
        newDiets = newDiets.filter(diet => diet !== 'normal');
      }

      if (isValidCombination(newDiets)) {
        return newDiets;
      } else {
        return prevDiets;
      }
    });
  };

  const resetDiets = () => {
    setSelectedDiets(['']);
  };

  useEffect(() => {
    setDiet(selectedDiets);
    console.log('Selected diets:', selectedDiets);
  }, [selectedDiets]);

  return (
    <div className="diet-pref">
      <div className="diet-title-container">
        <h3 className="diet-title">Diet Preference</h3>
        <span className="reset-text" onClick={resetDiets}>(reset)</span>
      </div>
      <div className="diet-selection">
        {dietOptions.map((diet, index) => (
          <img
            key={index}
            src={diet.icon}
            alt={`${diet.name} diet`}
            className={`diet-icon ${selectedDiets.includes(diet.name) ? 'selected' : ''}`}
            onClick={() => toggleDiet(diet.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default DietPref;