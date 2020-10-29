import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import Header from '../components/Header';
import '../assets/styles/components/Login.scss';

const Login = () => {
  const [form, setValues] = useState();
  const handleLogin = async (e) => {
    // console.log(btoa(utf8.encode(`${form.email}:${form.password}`)));
    e.preventDefault();

    const data = await axios({
      url: `${process.env.SERVER_IP}/auth/login`,
      method: 'POST',
      withCredentials: 'true',
      auth: {
        username: form.email,
        password: form.password,
      },
    })
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 401) {
          swal.fire({
            icon: 'error',
            title: 'Contraseña o usuario incorrectos',
          });
        }
      });
  };

  // const checkAuth = async () => {
  //   const data = await axios({
  //     url: `${process.env.SERVER_IP}/auth/check`,
  //     method: 'GET',
  //     withCredentials: 'true',
  //   }).then((r) => console.log(r));
  // };

  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Header />
      <div className='main-container'>
        <div className='login-title-container'>
          <h2>Iniciar sesión</h2>
        </div>
        <form className='login-form'>
          <input
            name='email'
            type='email'
            inputMode='email'
            placeholder='Email'
            onChange={handleInput}
          />
          <input
            name='password'
            type='password'
            placeholder='Contraseña'
            onChange={handleInput}
          />
          <button type='button' onClick={handleLogin}>
            Acceder
          </button>
          <button type='button' onClick={checkAuth}>
            Revisa si tengo permisos para acceder
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
