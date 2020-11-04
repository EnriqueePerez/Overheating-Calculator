import React, { useEffect, useState } from 'react';
import { useUser } from '../utils/userContext';

const UserInfo = ({ history }) => {
  const [usuario, setUsuario] = useState();
  const { user, verifyUser } = useUser();
  //   useEffect(() => {
  //     verifyUser()
  //       .then((r) => {
  //         setUsuario(r.user.name);
  //         console.log(r.user);
  //         console.log(user);
  //       })
  //       .catch((e) => history.push('/login'));
  //   }, []);
  return (
    <>
      <p>Usuario{usuario}</p>
    </>
  );
};

export default UserInfo;
