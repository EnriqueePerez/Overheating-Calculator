import React from 'react';
import '../assets/styles/components/Choices.scss';

const SecondChoice = () => {
  return (
    <>
      <div className='title-container'>
        <h1>Tipo de Unidad</h1>
      </div>
      <div className='buttons-container'>
        <button type='submit'>Conservación</button>
        <button type='submit'>Cerveza</button>
        <button type='submit'>Hielo</button>
      </div>
    </>
  );
};

export default SecondChoice;
