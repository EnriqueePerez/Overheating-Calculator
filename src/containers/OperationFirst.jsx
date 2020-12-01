/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import Title from '../components/Title';
import Navigation from './Navigation';

const OperationFirst = (props) => {
  return (
    <>
      <div className='navigationContainer'>
        <Navigation />
        <UserInfo />
      </div>
      <Title title='Operación de Equipo' />
      <div className='title-container'>
        <h1>Tipo de Unidad</h1>
      </div>
      <div className='buttons-container'>
        <Link to='operation/unitnumber/Conservacion'>
          <button type='submit'>Conservación</button>
        </Link>
        <Link to='operation/stores/Cerveza/1'>
          <button type='submit'>Cerveza</button>
        </Link>
        <Link to='operation/stores/Hielo/1'>
          <button type='submit'>Hielo</button>
        </Link>
        <Link to='operation/unitnumber/Clima'>
          <button type='submit'>Clima</button>
        </Link>
      </div>
    </>
  );
};

export default OperationFirst;
