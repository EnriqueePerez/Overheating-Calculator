import React, { useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';

const FirstChoice = (props) => {
  useEffect(() => {
    const checkAuth = async () => {
      await axios({
        url: `${process.env.SERVER_IP}/auth/verify`,
        method: 'POST',
        withCredentials: true,
      })
        .then((r) => {
          if (r.status === 202) {
            console.log('aprobado');
          }
        })
        .catch((e) => {
          props.history.push('/login');
        });
    };
    checkAuth();
  }, []);

  return (
    <>
      <div className='title-container'>
        <h1>Tipo de Unidad</h1>
      </div>
      <div className='buttons-container'>
        <Link to='/unitnumber/Conservacion'>
          <button type='submit'>Conservación</button>
        </Link>
        <Link to='/refrigerant/Cerveza/1'>
          <button type='submit'>Cerveza</button>
        </Link>
        <Link to='/refrigerant/Hielo/1'>
          <button type='submit'>Hielo</button>
        </Link>
      </div>
    </>
  );
};

export default FirstChoice;
