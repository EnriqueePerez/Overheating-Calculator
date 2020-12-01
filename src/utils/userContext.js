/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';
// import React, { useContext, useMemo, useState } from 'react';

// const UserContext = React.createContext(); //where the user is going to be save

// export function UserProvider({ children }) {
//   const [user, setUser] = useState();

//   // eslint-disable-next-line import/prefer-default-export

//   // const value = useMemo(() => {
//   //   return {
//   //     user,
//   //     verifyUser,
//   //     login,
//   //     logout,
//   //   };
//   // }, []);

//   const value = user;

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }

export async function login(email, password) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.SERVER_IP}/auth/login`,
      method: 'POST',
      withCredentials: 'true',
      auth: {
        username: email,
        password,
      },
    }) //save data on state after verify
      .then((r) => {
        //   console.log(r.data);
        // setUser(r.data);
        resolve(202);
      })
      .catch((err) => {
        if (err.response === undefined) {
          reject(500);
        } else {
          reject(401);
        }
      });
  });
}

export async function logout() {
  return new Promise((resolve, reject) => {
    axios({
      url: `${process.env.SERVER_IP}/auth/logout`,
      method: 'POST',
      withCredentials: 'true',
    })
      .then(() => {
        // setUser(null);
        resolve(200);
      })
      .catch((err) => {
        if (err.response === undefined) {
          reject(500);
        }
      });
  });
}

export async function verifyUser() {
  return new Promise((resolve, reject) => {
    resolve({ user: { name: 'Enrique' } });
    // axios({
    //   url: `${process.env.SERVER_IP}/auth/verify`,
    //   method: 'POST',
    //   withCredentials: 'true',
    // })
    //   .then((r) => {
    //     if (r.status === 202) {
    //       // setUser(r.data);
    //       resolve(r.data);
    //       // useUserUpdate(r.data.user.name);
    //       //   console.log(r.data);
    //       // console.log('aprobado');
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response === undefined) {
    //       reject(500);
    //     } else if (err.response.status === 401) {
    //       reject(401);
    //     } else if (err.response.status === 404) {
    //       reject(404);
    //     }
    //   });
  });
}

// //custom hook for the user
// export function useUser() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be inside UserContext Provider');
//   }
//   return context;
// }

// const UserUpdateContext = React.createContext(); //context to update the value of the user

// //custom hooks to use the context
// export function useUser() {
//   return useContext(UserContext);
// }

// export function useUserUpdate(u) {
//   return useContext(UserUpdateContext);
// }

// export function UserProvider({ children }) {

//   function toggleUser(user) {
//     setUser(user);
//   }

//   return (
//     <UserContext.Provider value={user}>
//       <UserUpdateContext.Provider value={toggleUser()}>
//         {children}
//       </UserUpdateContext.Provider>
//     </UserContext.Provider>
//   );
// }
