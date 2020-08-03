import React from 'react';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';

const ThirdChoice = ({ match }) => {
  console.log(match);
  return (
    <>
      <div className='title-container'>
        <h1>Número de unidad</h1>
      </div>
      <div className='buttons-container'>
        <Link to={`/refrigerant/${match.params.unit}/1`}>
          <button type='submit'>1</button>
        </Link>
        <Link to={`/refrigerant/${match.params.unit}/2`}>
          <button type='submit'>2</button>
        </Link>
        <Link to={`/refrigerant/${match.params.unit}/3`}>
          <button type='submit'>3</button>
        </Link>
      </div>
    </>
  );
};

export default ThirdChoice;
