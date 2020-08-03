import React from 'react';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';

const FourthChoice = ({ match }) => {
  console.log(match);
  return (
    <>
      <div className='title-container'>
        <h1>Tipo de Gas</h1>
      </div>
      <div className='buttons-container'>
        <Link to={`/main/R22/${match.params.unit}/${match.params.unitnumber}`}>
          <button type='submit'>R-22</button>
        </Link>
        <Link
          to={`/main/R404a/${match.params.unit}/${match.params.unitnumber}`}
        >
          <button type='submit'>R404a</button>
        </Link>
      </div>
    </>
  );
};

export default FourthChoice;
