import React from 'react';
import '../assets/styles/components/FirstChoice.scss';

const FirstChoicing = () => {
  return (
    <>
      <div className='title-container'>
        <h1>¿Qué quieres hacer?</h1>
      </div>
      <div className='buttons-container'>
        <button type='submit'>Calcular y enviar datos</button>
        <button type='submit'>Solo calcular datos</button>
      </div>
    </>
  );
};

export default FirstChoicing;
