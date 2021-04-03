/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import Navigation from './Navigation';
import Title from '../components/Title';

const OverUnits = ({ match }) => {
  return (
    <>
      <div className='navigationContainer'>
        <Navigation onMain={false} />
        <UserInfo />
      </div>
      <Title title='Sobrecalentamiento' />
      <div className='title-container'>
        <h1>Tipo de Unidad</h1>
        <header>
          <h2>{match.params.store}</h2>
        </header>
      </div>
      <div className='buttons-container'>
        <Link
          to={`/overheating/unitnumber/${match.params.storecr}/${match.params.store}/Conservacion`}
        >
          <button type='submit'>Conservación</button>
        </Link>
        <Link
          to={`/overheating/refrigerant/${match.params.storecr}/${match.params.store}/1/Cerveza`}
        >
          <button type='submit'>Cerveza</button>
        </Link>
        <Link
          to={`/overheating/refrigerant/${match.params.storecr}/${match.params.store}/1/Hielo`}
        >
          <button type='submit'>Hielo</button>
        </Link>
      </div>
    </>
  );
};

export default OverUnits;
