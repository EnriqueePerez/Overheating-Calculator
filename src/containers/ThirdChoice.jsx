import React, { useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/components/Choices.scss';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const ThirdChoice = ({ match, history }) => {
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
        <h1>Tipo de Gas</h1>
      </div>
      <div className='buttons-container'>
        <Link
          to={`/stores/R22/${match.params.unit}/${match.params.unitnumber}`}
        >
          <button type='submit'>R-22</button>
        </Link>
        <Link
          to={`/stores/R404a/${match.params.unit}/${match.params.unitnumber}`}
        >
          <button type='submit'>R404a</button>
        </Link>
      </div>
    </>
  );
};

export default ThirdChoice;
