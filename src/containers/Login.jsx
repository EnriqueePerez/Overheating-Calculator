import React from 'react';
import Header from '../components/Header';
import '../assets/styles/components/Login.scss';

const Login = () => {
  return (
    <>
      <Header />
      <div className='main-container'>
        <div className='login-title-container'>
          <h2>Iniciar sesión</h2>
        </div>
        <form className='login-form'>
          <input placeholder='Usuario' />
          <input placeholder='Contraseña' />
          <button type='submit'>Acceder</button>
        </form>
      </div>
    </>
  );
};

export default Login;
