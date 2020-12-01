import React from 'react';
// import axios from 'axios';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import Title from '../components/Title';

const ThirdChoice = ({ match, history }) => {
  return (
    <>
      <div className='navigationContainer'>
        <Navigation />
        <UserInfo />
      </div>
      <Title title='Sobrecalentamiento' />
      <div className='title-container'>
        <h1>Tipo de Gas</h1>
      </div>
      <div className='buttons-container'>
        <Link
          to={`/overheating/stores/R22/${match.params.unit}/${match.params.unitnumber}`}
        >
          <button type='submit'>R-22</button>
        </Link>
        <Link
          to={`/overheating/stores/R404a/${match.params.unit}/${match.params.unitnumber}`}
        >
          <button type='submit'>R404a</button>
        </Link>
      </div>
    </>
  );
};

export default ThirdChoice;
