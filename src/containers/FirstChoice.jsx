/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import Navigation from './Navigation';

const FirstChoice = (props) => {
  const isHome = true;
  let [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className='navigationContainer'>
        {isHome ? <div /> : <Navigation />}
        <div onClick={() => setShowMenu(true)}>
          <UserInfo showMenu={showMenu} />
        </div>
      </div>
      <div className='title-container'>
        <h1>Tipo de Unidad</h1>
      </div>
      <div className='buttons-container'>
        <Link to='/unitnumber/Conservacion'>
          <button type='submit'>Conservación</button>
        </Link>
        <Link to='/refrigerant/Cerveza/1'>
          <button type='submit'>Cerveza</button>
        </Link>
        <Link to='/refrigerant/Hielo/1'>
          <button type='submit'>Hielo</button>
        </Link>
      </div>
    </>
  );
};

export default FirstChoice;
