import React from 'react';
import '../assets/styles/components/Header.scss';
import logo from '../assets/ISAAR-Logo.png';

const Header = () => {
  return (
    <>
      <header className='login-header'>
        <h1 className='title'>
          Calculadora de eficiencia y sobrecalentamiento de unidades de
          refrigeración
        </h1>
      </header>
      <div className='logo-container'>
        <img src={logo} alt='Logo' />
      </div>
    </>
  );
};

export default Header;
