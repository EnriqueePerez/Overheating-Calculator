import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import '../assets/styles/components/Choices.scss';

const FourthChoice = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:5000/stores', {
        method: 'GET',
        mode: 'cors',
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          //   console.log(dasta);
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      setStores(result);
    };
    fetchData();
  }, []);
  return (
    <>
      <Navigation />
      <div className='title-container'>
        <h1>Tienda</h1>
        {/* {stores.map((store) => (
          <p>
            {store.CR} {store.nombre}
          </p> */}
        ))
        <button type='button' onClick={(e) => console.log(stores)}>
          Hola
        </button>
      </div>
    </>
  );
};

export default FourthChoice;
