import React from 'react';
import '../assets/styles/components/Header.scss';
// import logo from '../assets/oxxo-logo.png';

const Header = () => {
  return (
    <header className='login-header'>
      {/* <div className='logo-container'>
        <img src={logo} alt='Logo' />
      </div> */}
      <h1 className='title'>Sobrecalentamiento de unidades de refrigeración</h1>
    </header>
  );
};

export default Header;
