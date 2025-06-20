/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import axios from 'axios';
import '../assets/styles/components/Choices.scss';
import { Link, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import Title from '../components/Title';
import { parseUnit } from '../utils/overValidation';

const OverRefrigerant = () => {
  const { storecr, store, unit, unitnumber } = useParams();
  const unitDisplay = parseUnit(unit, unitnumber);
  
  // console.log(params);
  return (
    <>
      <div className='navigationContainer'>
        <Navigation onMain={false} />
        <UserInfo />
      </div>
      <Title title='Sobrecalentamiento' />
      <div className='title-container'>
        <h1>Tipo de Gas</h1>
        <header>
          <h2>{`${store} - ${unitDisplay}`}</h2>
        </header>
      </div>
      <div className='buttons-container'>
        <Link
          to={`/overheating/main/R22/${unit}/${unitnumber}/${storecr}/${store}`}
        >
          <button type='submit'>R-22</button>
        </Link>
        <Link
          to={`/overheating/main/R404a/${unit}/${unitnumber}/${storecr}/${store}`}
        >
          <button type='submit'>R404a</button>
        </Link>
        <Link
          to={`/overheating/main/R449a/${unit}/${unitnumber}/${storecr}/${store}`}
        >
          <button type='submit'>R449a</button>
        </Link>
      </div>
    </>
  );
};

export default OverRefrigerant;
