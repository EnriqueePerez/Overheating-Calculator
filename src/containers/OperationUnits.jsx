/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import Title from '../components/Title';
import Navigation from './Navigation';

const OperationUnits = ({ match }) => {
  return (
    <>
      <div className='navigationContainer'>
        <Navigation onMain={false} />
        <UserInfo />
      </div>
      <Title title='Eficiencia de Trabajo' />
      <div className='title-container'>
        <h1>Tipo de Unidad</h1>
        <header>
          <h2>{match.params.store}</h2>
        </header>
      </div>
      <div className='buttons-container'>
        <Link
          to={`/operation/unitnumber/${match.params.storecr}/${match.params.store}/Conservacion`}
        >
          <button type='submit'>Conservación</button>
        </Link>
        <Link
          to={`/operation/main/Cerveza/1/${match.params.storecr}/${match.params.store}`}
        >
          <button type='submit'>Cerveza</button>
        </Link>
        <Link
          to={`/operation/main/Hielo/1/${match.params.storecr}/${match.params.store}`}
        >
          <button type='submit'>Hielo</button>
        </Link>
        <Link
          to={`/operation/unitnumber/${match.params.storecr}/${match.params.store}/Clima`}
        >
          <button type='submit'>Clima</button>
        </Link>
      </div>
    </>
  );
};

export default OperationUnits;
