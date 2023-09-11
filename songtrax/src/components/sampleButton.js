import React, { useState } from 'react';

function ToggleButtons({ onButtonsStateChange }, note) {
  const [buttonsState, setButtonsState] = useState(Array(16).fill(false));

  const handleButtonClick = (index) => {
    const newButtonsState = [...buttonsState];
    newButtonsState[index] = !newButtonsState[index];
    setButtonsState(newButtonsState);
    onButtonsStateChange(newButtonsState);
  };

  return (
    <div className="sequence-row-container1">
      {buttonsState.map((isSelected, index) => (
        <button
          key={index}
          className={`toggle${isSelected ? '-selected' : ''}`}
          onClick={() => handleButtonClick(index)}
        ></button>
      ))}
    </div>
  );
}

export default ToggleButtons;