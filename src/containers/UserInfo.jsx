/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { verifyUser, logout } from '../utils/userContext';
import '../assets/styles/components/userInfo.scss';

const UserInfo = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState('sin horario');
  const [showMenu, setShowMenuBar] = useState(false);

  const redirectToLogout = () => {
    logout()
      .then(() => window.location.reload())
      .catch(() => history.push('/login'));
  };

  const checkTime = () => {
    const now = new Date();
    const hour = now.getHours();
    // console.log(now.getHours());
    if (hour >= 0 && hour < 5) {
      setGreeting('Buenas noches ');
    } else if (hour >= 5 && hour < 12) {
      setGreeting('Buenos dias ');
    } else if (hour >= 12 && hour <= 18) {
      setGreeting('Buenas tardes ');
    } else if (hour > 18 && hour <= 24) {
      setGreeting('Buenas noches ');
    }
  };

  useEffect(() => {
    // setShowMenuBar(true);
    if (user === null) {
      checkTime();
      verifyUser()
        .then((r) => {
          setUser(r.user.name);
          // console. log(r.user.name);
        })
        .catch(() => history.push('/login'));
    }
  }, []);

  return (
    <>
      <div className='userContainer' onClick={() => setShowMenuBar(!showMenu)}>
        <p>
          {greeting}
          {user}
        </p>
        {showMenu ? (
          <div className='extraInfo'>
            <Link to='/changePass'>
              <p>Cambiar contraseña</p>
            </Link>
            <p onClick={redirectToLogout}>Cerrar sesión</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UserInfo;
