import React from 'react';
import '../assets/styles/components/Choices.scss';

const ThirdChoice = () => {
  return (
    <>
      <div className='title-container'>
        <h1>Número de unidad</h1>
      </div>
      <div className='buttons-container'>
        <button type='submit'>1</button>
        <button type='submit'>2</button>
        <button type='submit'>3</button>
      </div>
    </>
  );
};

export default ThirdChoice;
