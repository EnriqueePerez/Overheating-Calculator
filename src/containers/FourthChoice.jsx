import React from 'react';
import '../assets/styles/components/Choices.scss';

const FourthChoice = () => {
  return (
    <>
      <div className='title-container'>
        <h1>Tipo de Gas</h1>
      </div>
      <div className='buttons-container'>
        <button type='submit'>R-22</button>
        <button type='submit'>R-404a</button>
      </div>
    </>
  );
};

export default FourthChoice;
