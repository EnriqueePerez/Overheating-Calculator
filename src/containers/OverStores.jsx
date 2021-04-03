/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import Swal from 'sweetalert2';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import Title from '../components/Title';
import '../assets/styles/components/Choices.scss';

const OverStores = (props) => {
  // console.log(match);
  const [stores, setStores] = useState([
    { id: '', nombre: 'Cargando tiendas' },
  ]);
  const [selectedStore, setSelectedStore] = useState('Selecciona la tienda');
  const [selectedStoreCR, setSelectedStoreCR] = useState('');

  const getNewUpdateStoresDate = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const newDate = new Date(year, month + 1, 1).toString();
    localStorage.setItem('dateToUpdateStores', newDate);
    // console.log(newDate);
    return newDate;
  };

  const doesStoresNeedToBeUpdated = () => {
    const localStorageDate = new Date(
      // eslint-disable-next-line comma-dangle
      localStorage.getItem('dateToUpdateStores')
    ).getTime();
    const actualDate = new Date().getTime();

    if (actualDate >= localStorageDate) {
      return true;
    }
    return false;
  };

  const fetchStores = async () => {
    // console.log('trayendo tiendas');
    const graphQLClient = new GraphQLClient(`${process.env.SERVER_IP}/api`, {
      mode: 'cors',
    });

    const query = gql`
      {
        getTiendas {
          id
          nombre
        }
      }
    `;

    await graphQLClient
      .request(query)
      .then((data) => {
        // console.log(JSON.stringify(data, undefined, 2));
        setStores(data.getTiendas);
        localStorage.setItem('stores', JSON.stringify(data.getTiendas));
        getNewUpdateStoresDate();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar las tiendas',
          text: 'Por favor, intenta mas tarde o reporta el problema',
        });
      });
  };

  useEffect(() => {
    if (localStorage.getItem('dateToUpdateStores') === null) {
      // console.log('trayendo tiendas porque no hay en localStorage');
      fetchStores();
    } else if (doesStoresNeedToBeUpdated()) {
      // console.log('trayendo tiendas porque necesitan ser actualizadas');
      fetchStores();
    } else {
      // console.log('usando tiendas del localStorage');
      setStores(JSON.parse(localStorage.getItem('stores')));
    }
  }, []);

  const handleSelection = (e) => {
    const index = e.target.selectedIndex; //Getting the index of the selected element
    const optionElement = e.target.childNodes[index]; //Getting the html line of the element;
    const CR = optionElement.getAttribute('id'); //Getting the id attribute from the HTML line
    const value = optionElement.getAttribute('value'); // Getting the value attribute from the HTML line
    setSelectedStoreCR(CR);
    setSelectedStore(value);
  };

  const redirectToUnits = (e) => {
    if (selectedStore === 'Selecciona la tienda') {
      alert('Por favor, selecciona una tienda');
    } else {
      // console.log(selectedStore);
      e.preventDefault();
      props.history.push(
        // eslint-disable-next-line comma-dangle
        `/overheating/units/${selectedStoreCR}/${selectedStore}`
        // `/overheating/main/${match.params.refrigerant}/${match.params.unit}/${match.params.unitnumber}/${selectedStoreCR}/${selectedStore}`
      );
    }
  };
  return (
    <>
      <div className='navigationContainer'>
        <Navigation onMain={false} />
        <UserInfo />
      </div>
      <Title title='Sobrecalentamiento' />
      <div className='title-container'>
        <h1>Tienda</h1>
        <div className='dropdown-list'>
          <select defaultValue={selectedStore} onChange={handleSelection}>
            <option>{selectedStore}</option>
            {stores
              ? stores.map((store) => (
                  <option key={store.id} id={store.id} value={store.nombre}>
                    {store.nombre}
                  </option>
                ))
              : null}
          </select>
        </div>
        <button
          className='continue-button'
          type='submit'
          onClick={redirectToUnits}
        >
          Continuar
        </button>
      </div>
    </>
  );
};

export default OverStores;
