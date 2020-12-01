import React from 'react';
import '../assets/styles/components/Navigation.scss';
import { Link } from 'react-router-dom';
import back from '../assets/back.png';

const Navigation = () => {
  return (
    <>
      <Link className='home-link-container' to='/'>
        <img src={back} alt='Atras' />
        <p>Regresar al inicio</p>
      </Link>
    </>
  );
};

export default Navigation;
