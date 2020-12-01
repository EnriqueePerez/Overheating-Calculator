/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import Navigation from './Navigation';

const Home = (props) => {
  const isHome = true;

  return (
    <>
      <div className='navigationContainer'>
        {isHome ? <div /> : <Navigation />}
        <UserInfo />
      </div>
      <div className='title-container'>
        <h1>Menú</h1>
      </div>
      <div className='buttons-container'>
        <Link to='/operation'>
          <button type='submit'>Operación de Trabajo</button>
        </Link>
        <Link to='/overheating'>
          <button style={{ fontSize: '1.2em' }} type='submit'>
            Sobrecalentamiento
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
