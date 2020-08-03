import React from 'react';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';

const SecondChoice = () => {
  return (
    <>
      <div className='title-container'>
        <h1>Tipo de Unidad</h1>
      </div>
      <div className='buttons-container'>
        <Link to='/unitnumber/Conservacion'>
          <button type='submit'>Conservación</button>
        </Link>
        <Link to='/refrigerant/Cerveza/1'>
          <button type='submit'>Cerveza</button>
        </Link>
        <Link to='/refrigerant/Hielo/1'>
          <button type='submit'>Hielo</button>
        </Link>
      </div>
    </>
  );
};

export default SecondChoice;
