/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import axios from 'axios';
import '../assets/styles/components/Choices.scss';
import { Link, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import Title from '../components/Title';

const OverUnitNumber = () => {
  const { storecr, store, unit } = useParams();
  // console.log(params);

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
          to={`/overheating/refrigerant/${storecr}/${store}/1/${unit}`}
        >
          <button type='submit'>1</button>
        </Link>
        <Link
          to={`/overheating/refrigerant/${storecr}/${store}/2/${unit}`}
        >
          <button type='submit'>2</button>
        </Link>
      </div>
    </>
  );
};

export default OverUnitNumber;
