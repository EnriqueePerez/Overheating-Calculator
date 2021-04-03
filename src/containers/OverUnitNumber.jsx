import React from 'react';
// import axios from 'axios';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import Title from '../components/Title';

const OverUnitNumber = ({ match, history }) => {
  // console.log(match.params);

  return (
    <>
      <div className='navigationContainer'>
        <Navigation onMain={false} />
        <UserInfo />
      </div>
      <Title title='Sobrecalentamiento' />
      <div className='title-container'>
        <h1>Número de evaporador</h1>
      </div>
      <div className='buttons-container'>
        <Link
          to={`/overheating/refrigerant/${match.params.storecr}/${match.params.store}/1/${match.params.unit}`}
        >
          <button type='submit'>1</button>
        </Link>
        <Link
          to={`/overheating/refrigerant/${match.params.storecr}/${match.params.store}/2/${match.params.unit}`}
        >
          <button type='submit'>2</button>
        </Link>
      </div>
    </>
  );
};

export default OverUnitNumber;
