import React, { useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const SecondChoice = ({ match, history }) => {
  // console.log(match);
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
          history.push('/login');
        });
    };
    checkAuth();
  }, []);
  return (
    <>
      <Navigation />
      <div className='title-container'>
        <h1>Número de unidad</h1>
      </div>
      <div className='buttons-container'>
        <Link to={`/refrigerant/${match.params.unit}/1`}>
          <button type='submit'>1</button>
        </Link>
        <Link to={`/refrigerant/${match.params.unit}/2`}>
          <button type='submit'>2</button>
        </Link>
      </div>
    </>
  );
};

export default SecondChoice;
