import React from 'react';
import '../assets/styles/components/Navigation.scss';
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import back from '../assets/back.png';

const Navigation = ({ onMain, direction, storecr, store }) => {
  const history = useHistory();
  const whereToGo = () => {
    if (onMain) {
      swal
        .fire({
          title: 'Regresando al inicio',
          text:
            '¿Deseas regresar al menú o continuar introduciendo datos de esta misma tienda?',
          icon: 'warning',
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonColor: '#3ed630',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Continuar con esta tienda',
          cancelButtonText: 'Regresar al menú',
        })
        .then((result) => {
          if (result.value) {
            if (direction === 'overheating') {
              history.push(`/overheating/units/${storecr}/${store}`);
            } else {
              history.push(`/operation/units/${storecr}/${store}`);
            }
          } else if (result.dismiss === 'close') {
          } else {
            history.push('/');
          }
        });
    } else {
      history.push('/');
    }
  };
  //create function to ask where to return, include toHome and direction
  return (
    <>
      <div
        onClick={whereToGo}
        role='button'
        tabIndex={0}
        className='home-link-container'
      >
        <img src={back} alt='Atras' />
        <p>Regresar al inicio</p>
      </div>
    </>
  );
};

export default Navigation;
