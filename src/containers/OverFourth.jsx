import React, { useEffect, useState } from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import Swal from 'sweetalert2';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import Title from '../components/Title';
import '../assets/styles/components/Choices.scss';

const FourthChoice = (props) => {
  const { match } = props;
  // console.log(match);
  const [stores, setStores] = useState([
    { id: '', nombre: 'Cargando tiendas' },
  ]);
  const [selectedStore, setSelectedStore] = useState('Selecciona la tienda');
  const [selectedStoreCR, setSelectedStoreCR] = useState('');

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
    // const fetchData = async () => {
    //   const result = await fetch(`${process.env.SERVER_IP}/api/stores`, {
    //     method: 'GET',
    //     mode: 'cors',
    //   })
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((data) => {
    //       // console.log(data[0].nombre);
    //       return data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       alert(
    //         // eslint-disable-next-line comma-dangle
    //         'Hubo un error cargando las tiendas. Por favor, intenta mas tarde o reporta el problema'
    //       );
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error al cargar las tiendas',
    //         text: 'Por favor, intenta mas tarde o reporta el problema',
    //       });
    //     });
    //   setStores(result);
    // };
    // fetchData();
  }, []);

  const handleSelection = (e) => {
    const index = e.target.selectedIndex; //Getting the index of the selected element
    const optionElement = e.target.childNodes[index]; //Getting the html line of the element;
    const CR = optionElement.getAttribute('id'); //Getting the id attribute from the HTML line
    const value = optionElement.getAttribute('value'); // Getting the value attribute from the HTML line
    setSelectedStoreCR(CR);
    setSelectedStore(value);
  };

  const redirectToMain = (e) => {
    if (selectedStore === 'Selecciona la tienda') {
      alert('Por favor, selecciona una tienda');
    } else {
      // console.log(selectedStore);
      e.preventDefault();
      props.history.push(
        // eslint-disable-next-line comma-dangle
        `/overheating/main/${match.params.refrigerant}/${match.params.unit}/${match.params.unitnumber}/${selectedStoreCR}/${selectedStore}`
      );
    }
  };
  return (
    <>
      <div className='navigationContainer'>
        <Navigation />
        <UserInfo />
      </div>
      <Title title='Sobrecalentamiento' />
      <div className='title-container'>
        <h1>Tienda</h1>
        <div className='dropdown-list'>
          <select defaultValue={selectedStore} onChange={handleSelection}>
            <option>{selectedStore}</option>
            {stores.map((store) => (
              <option key={store.id} id={store.id} value={store.nombre}>
                {store.nombre}
              </option>
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
