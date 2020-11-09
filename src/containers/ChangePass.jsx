import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import { logout } from '../utils/userContext';
import '../assets/styles/components/Login.scss';

const ChangePass = () => {
  const [form, setValues] = useState({
    new_password: '',
    confirm_new_password: '',
  });
  const cleanForm = () => {
    document.getElementById('new_password').value = '';
    document.getElementById('confirm_new_password').value = '';
  };
  const verifyPassword = async (e) => {
    // console.log(form);
    // verifyUser()
    //   .then(() => {})
    //   .catch(() => props.history.push('./login'));
    if (form.new_password === '' || form.confirm_new_password === '') {
      //   console.log('faltan campos');
      swal.fire({
        icon: 'error',
        title: 'Faltan campos por rellenar',
      });
    } else {
      if (form.new_password === form.confirm_new_password) {
        await axios({
          url: `${process.env.SERVER_IP}/auth/changePass`,
          method: 'POST',
          withCredentials: 'true',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            newPass: form.new_password, //make route to check old pass and change password, add jwt auth first and then add new function in user service to change pass
          },
        })
          .then(() => {
            swal
              .fire({
                icon: 'success',
                title: 'Contraseña cambiada exitosamente.',
              })
              .then(() => {
                logout()
                  .then(() => window.location.reload())
                  .catch(() => {
                    swal.fire({
                      icon: 'error',
                      title:
                        'Ocurrio un problema interno. Por favor, reporta el problema',
                    });
                  });
              });
          })
          .catch(() => {
            swal.fire({
              icon: 'error',
              title:
                'Ocurrio un problema al cambiar la contraseña. Intenta de nuevo.',
            });
          });
      } else {
        swal.fire({
          icon: 'error',
          title: 'La nueva contraseña no coincide con la confirmación.',
        });
      }
      cleanForm();
    }
  };

  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className='navigationContainer'>
        <Navigation />
        <UserInfo />
      </div>
      <div className='main-container'>
        <div className='login-title-container'>
          <h2>Cambiar Contraseña</h2>
        </div>
        <form className='login-form'>
          {/* <input
            id='old_password'
            name='old_password'
            type='password'
            inputMode='password'
            placeholder='Contraseña anterior'
            onChange={handleInput}
          /> */}
          <input
            id='new_password'
            name='new_password'
            type='password'
            placeholder='Nueva Contraseña'
            onChange={handleInput}
          />
          <input
            id='confirm_new_password'
            name='confirm_new_password'
            type='password'
            placeholder='Confirme Nueva Contraseña'
            onChange={handleInput}
          />
          <button type='button' onClick={verifyPassword}>
            Confirmar
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePass;
