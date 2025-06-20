/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import axios from 'axios';
import '../assets/styles/components/Choices.scss';
import { Link, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import Title from '../components/Title';

const OperationUnitNumber = () => {
  const { storecr, store, unit } = useParams();
  
  return (
    <>
      <div className='navigationContainer'>
        <Navigation onMain={false} />
        <UserInfo />
      </div>
      <Title title='Eficiencia de Trabajo' />
      <div className='title-container'>
        <h1>Número de evaporador</h1>
      </div>
      <div className='buttons-container'>
        <Link
          to={`/operation/main/${unit}/1/${storecr}/${store}`}
        >
          <button type='submit'>1</button>
        </Link>
        <Link
          to={`/operation/main/${unit}/2/${storecr}/${store}`}
        >
          <button type='submit'>2</button>
        </Link>
      </div>
    </>
  );
};

export default OperationUnitNumber;
