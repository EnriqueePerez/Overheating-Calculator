import React, { useState } from 'react';
// import axios from 'axios';
import swal from 'sweetalert2';
import Header from '../components/Header';
import { login } from '../utils/userContext';
import '../assets/styles/components/Login.scss';

const Login = (props) => {
  const [form, setValues] = useState();

  const cleanForm = () => {
    document.getElementById('email').value = '';
    document.getElementById('pass').value = '';
  };

  const handleLogin = async (e) => {
    // console.log(btoa(utf8.encode(`${form.email}:${form.password}`)));
    e.preventDefault();
    login(form.email, form.password)
      .then((r) => {
        console.log(r);
        if (r === 202) {
          props.history.push('/');
        }
      })
      .catch((e) => {
        console.log(e);
        if (e === 401) {
          swal.fire({
            icon: 'error',
            title: 'Contraseña o usuario incorrectos',
          });
        } else if (e === 500) {
          swal.fire({
            icon: 'error',
            title: 'Hubo un error en la autenticación',
          });
        }
      });
    cleanForm();
  };

  // const removeToken = () => {
  //   logout()
  //     .then(() => console.log('sesion cerrada'))
  //     .catch((e) => console.log(e));
  // };

  // const checkAuth = async () => {
  //   await axios({
  //     url: `${process.env.SERVER_IP}/auth/verify`,
  //     method: 'POST',
  //     withCredentials: true,
  //   })
  //     .then((r) => {
  //       if (r.status === 200) {
  //         console.log('aprobado');
  //       }
  //     })
  //     .catch((e) => {
  //       props.history.push('/login');
  //     });
  // };
  const showPassword = () => {
    const pass = document.getElementById('pass');
    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
  };

  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div style={{ backgroundColor: '#FFFFFFC4', height: '100vh' }}>
      <Header />
      <div className='main-container'>
        <div className='login-title-container'>
          <h2 style={{ color: 'black' }}>Iniciar sesión</h2>
        </div>
        <form className='login-form'>
          <input
            id='email'
            name='email'
            type='email'
            inputMode='email'
            placeholder='Email'
            onChange={handleInput}
          />
          <input
            id='pass'
            name='password'
            type='password'
            placeholder='Contraseña'
            onChange={handleInput}
          />
          <div className='show-password'>
            <input type='checkbox' onClick={showPassword} />
            <p style={{ color: 'black' }}>Mostrar contraseña</p>
          </div>
          <button type='button' onClick={handleLogin}>
            Acceder
          </button>
          {/* <button type='button' onClick={removeToken}>
            Remover permisos
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
