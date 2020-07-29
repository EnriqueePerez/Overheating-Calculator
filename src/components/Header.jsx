import React from 'react';
import '../assets/styles/components/Header.scss';
import logo from '../assets/oxxo-logo.png';

const Header = () => {
  return (
    <header>
      <div className='logo-container'>
        <img src={logo} alt='Logo' />
      </div>
      <div>
        <h1 className='title'>
          Sobrecalentamiento de unidades de refrigeración
        </h1>
      </div>
    </header>
  );
};

export default Header;
