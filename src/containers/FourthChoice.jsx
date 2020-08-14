import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import '../assets/styles/components/Choices.scss';

const FourthChoice = (props) => {
  const { match } = props;
  console.log(match);
  const [stores, setStores] = useState([
    { CR: '', nombre: 'Cargando tiendas' },
  ]);
  const [selectedStore, setSelectedStore] = useState('Selecciona la tienda');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://192.168.0.6:5000/stores', {
        method: 'GET',
        mode: 'cors',
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          //   console.log(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      setStores(result);
    };
    fetchData();
  }, []);

  const handleSelection = (e) => {
    setSelectedStore(e.target.value);
  };

  const redirectToMain = (e) => {
    if (selectedStore === 'Selecciona la tienda') {
      alert('Por favor, selecciona una tienda');
    } else {
      console.log(selectedStore);
      e.preventDefault();
      props.history.push(
        // eslint-disable-next-line comma-dangle
        `/main/${match.params.refrigerant}/${match.params.unit}/${match.params.unitnumber}/${selectedStore}`
      );
    }
  };
  return (
    <>
      <Navigation />
      <div className='title-container'>
        <h1>Tienda</h1>
        <div className='dropdown-list'>
          <select defaultValue={selectedStore} onChange={handleSelection}>
            <option>{selectedStore}</option>
            {stores.map((store) => (
              <option key={store.CR}>{store.nombre}</option>
            ))}
          </select>
        </div>
        <button
          className='continue-button'
          type='submit'
          onClick={redirectToMain}
        >
          Continuar
        </button>
      </div>
    </>
  );
};

export default FourthChoice;
