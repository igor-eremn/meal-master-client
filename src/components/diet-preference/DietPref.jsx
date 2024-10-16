import React, { useState } from 'react';
import './DietPref.css';

import normalIcon       from '../../assets/diet-pref/dt-1.png';
import veganIcon        from '../../assets/diet-pref/dt-2.png';
import vegetarianIcon   from '../../assets/diet-pref/dt-3.png';
import glutenFreeIcon   from '../../assets/diet-pref/dt-4.png';
import dairyFreeIcon    from '../../assets/diet-pref/dt-5.png';

const DietPref = () => {
  const [selectedDiet, setSelectedDiet] = useState('normal');

  const dietOptions = [
    { name: 'normal', icon: normalIcon },
    { name: 'vegan', icon: veganIcon },
    { name: 'vegetarian', icon: vegetarianIcon },
    { name: 'gluten-free', icon: glutenFreeIcon },
    { name: 'dairy-free', icon: dairyFreeIcon },
  ];

  return (
    <div className="diet-pref">
      <h3 className="diet-title">Diet Preference</h3>
      <div className="diet-selection">
        {dietOptions.map((diet, index) => (
          <img
            key={index}
            src={diet.icon}
            alt={`${diet.name} diet`}
            className={`diet-icon ${selectedDiet === diet.name ? 'selected' : ''}`}
            onClick={() => setSelectedDiet(diet.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default DietPref;