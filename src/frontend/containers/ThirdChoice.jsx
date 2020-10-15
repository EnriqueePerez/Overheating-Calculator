import React from 'react';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const FourthChoice = ({ match }) => {
  // console.log(match);
  return (
    <>
      <Navigation />
      <div className='title-container'>
        <h1>Tipo de Gas</h1>
      </div>
      <div className='buttons-container'>
        <Link
          to={`/stores/R22/${match.params.unit}/${match.params.unitnumber}`}
        >
          <button type='submit'>R-22</button>
        </Link>
        <Link
          to={`/stores/R404a/${match.params.unit}/${match.params.unitnumber}`}
        >
          <button type='submit'>R404a</button>
        </Link>
      </div>
    </>
  );
};

export default FourthChoice;
