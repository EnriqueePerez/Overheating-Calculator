import React from 'react';
// import axios from 'axios';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import Title from '../components/Title';

const OperationSecond = ({ match }) => {
  return (
    <>
      <div className='navigationContainer'>
        <Navigation />
        <UserInfo />
      </div>
      <Title title='Eficiencia de Trabajo' />
      <div className='title-container'>
        <h1>Número de evaporador</h1>
      </div>
      <div className='buttons-container'>
        <Link to={`/operation/stores/${match.params.unit}/1`}>
          <button type='submit'>1</button>
        </Link>
        <Link to={`/operation/stores/${match.params.unit}/2`}>
          <button type='submit'>2</button>
        </Link>
      </div>
    </>
  );
};

export default OperationSecond;
