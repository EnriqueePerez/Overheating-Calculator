import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert2';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import '../assets/styles/components/Login.scss';

const ChangePass = () => {
  const history = useHistory();
  const firebase = useFirebaseApp();
  const [form, setValues] = useState({
    new_password: '',
    confirm_new_password: '',
  });
  const cleanForm = () => {
    document.getElementById('new_password').value = '';
    document.getElementById('confirm_new_password').value = '';
  };

  const changePassword = async () => {
    await firebase
      .auth()
      .currentUser.updatePassword(form.new_password)
      .then(() => {
        swal
          .fire({
            icon: 'success',
            title: 'Contraseña cambiada exitosamente.',
          })
          .then(async () => {
            await firebase
              .auth()
              .signOut()
              .then(() => {
                history.push('/login');
              })
              .catch(() => {
                history.push('/login');
              });
          });
      })
      .catch((error) => {
        console.log('error changing password', error);
        if (error.code === 'auth/requires-recent-login') {
          swal
            .fire({
              title: 'Inicio de sesión requerido',
              text:
                'Para poder cambiar tu contraseña, debes iniciar sesion nuevamente. Una vez iniciado sesión, intenta nuevamente.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3ed630',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Iniciar sesión nuevamente',
              cancelButtonText: 'Cancelar',
            })
            .then(async (result) => {
              if (result.value) {
                await firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    history.push('/login');
                  })
                  .catch(() => {
                    history.push('/login');
                  });
              } else if (result.dismiss === 'cancel') {
                swal.fire({
                  title: 'Contraseña no cambiada',
                  icon: 'info',
                });
              }
            });
        } else {
          swal.fire({
            icon: 'error',
            title:
              'Ocurrio un problema interno. Por favor, reporta el problema',
          });
        }
      });
  };
  const verifyPassword = async (e) => {
    // console.log(form);
    if (form.new_password === '' || form.confirm_new_password === '') {
      //   console.log('faltan campos');
      swal.fire({
        icon: 'error',
        title: 'Faltan campos por rellenar',
      });
    } else {
      if (form.new_password === form.confirm_new_password) {
        await changePassword();
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
