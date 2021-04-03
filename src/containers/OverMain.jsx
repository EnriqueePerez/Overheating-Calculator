import React, { useState, useEffect } from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import '../assets/styles/components/OverMain.scss';
import Swal from 'sweetalert2';
import { useUser } from 'reactfire';
import 'firebase/auth';
import {
  validateStopPressure,
  validateStartPressure,
  calculation,
  validateOverheatingTemperature,
  parseUnit,
} from '../utils/overValidation';
import Navigation from './Navigation';
import UserInfo from './UserInfo';

const Main = ({ match, history }) => {
  let duplicatedId;
  const user = useUser();
  const [userId, setUserId] = useState(9);
  const [unit, setUnit] = useState('Sin Unidad');
  const [refrigerant, setRefrigerant] = useState('Sin Refrigerante');
  const [store, setStore] = useState('Sin tienda');
  const [storeCr, setStoreCr] = useState('');

  const [tubeTemperature, setTubeTemperature] = useState(0);
  const [saturationTemperature, setSaturationTemperature] = useState(0);
  const [overheatingTemperature, setOverheatingTemperature] = useState(0);
  const [approved, setApproved] = useState('No');
  const [readyToSend, setReadyToSend] = useState(false);
  const [form, setValues] = useState({
    comentarios: 'Sin comentarios',
    aprobado: 0,
    presion_arranque: 0,
    presion_paro: 0,
    presion_succion: undefined,
    resistencia_pt1000: undefined,
    temp_saturacion: 0,
    temp_tubo: 0,
    temp_sobrecalentamiento: '',
    unidad: 'Sin unidad',
    refrigerante: 'Sin refrigerante',
    CR: 'AAA',
    id_usuario: 9,
  });
  const graphQLClient = new GraphQLClient(`${process.env.SERVER_IP}/api`, {
    mode: 'cors',
  });

  const generalValidation = () => {
    if (
      document.querySelector('#startPressure').style.backgroundColor ===
        'rgb(136, 252, 136)' &&
      document.querySelector('#stopPressure').style.backgroundColor ===
        'rgb(136, 252, 136)' &&
      document.getElementById('overheatingTemp').style.color === 'green'
    ) {
      setApproved('Si');
      // console.log(approved);
    } else {
      setApproved('No');
      // console.log(approved);
    }
    setValues({
      ...form,
      aprobado: approved,
    });
  };

  const handleUserInput = async (e) => {
    if (user === null || undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Error interno',
        text: 'Por favor, reporta el problema',
      });
      history.push('/');
    } else {
      setUserId(parseInt(user.data.uid, 10));
      // console.log('handleUserInput', user.data.uid);
    }
    // const query = gql`
    //   query searchingUser($email: String!) {
    //     getUsuario(email: $email) {
    //       id
    //     }
    //   }
    // `;

    // const variables = {
    //   email: user.data.email,
    // };

    // await graphQLClient
    //   .request(query, variables)
    //   .then((data) => {
    //     // console.log(JSON.stringify(data, undefined, 2));
    //     // console.log('data.getUsuarios', typeof data.getUsuario.id);
    //     setUserId(parseInt(data.getUsuario.id, 10));
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error interno',
    //       text: 'Por favor, reporta el problema',
    //     });
    //   });
  };

  useEffect(() => {
    handleUserInput();
    validateOverheatingTemperature(overheatingTemperature, unit);
    setUnit(parseUnit(match.params.unit, match.params.unitnumber));
    setRefrigerant(match.params.refrigerant);
    setStoreCr(match.params.storecr);
    setStore(match.params.store);
    generalValidation();
  }, [approved, overheatingTemperature, readyToSend]);

  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
    setReadyToSend(false);
  };

  const validationStartPressure = (e) => {
    validateStartPressure(e, refrigerant, unit);
    handleInput(e);
  };

  const validationStopPressure = (e) => {
    validateStopPressure(e, refrigerant, unit);
    handleInput(e);
  };

  const calculate = () => {
    if (
      form.presion_succion === undefined ||
      form.resistencia_pt1000 === undefined
    ) {
      Swal.fire({
        title: 'Faltan campos por rellenar',
        icon: 'error',
      });
    } else if (form.presion_succion === '' || form.resistencia_pt1000 === '') {
      Swal.fire({
        title: 'Faltan campos por rellenar',
        icon: 'error',
      });
    } else {
      const operation = calculation(
        refrigerant,
        form.presion_succion,
        // eslint-disable-next-line comma-dangle
        form.resistencia_pt1000
      );
      operation &&
        (setSaturationTemperature(operation.saturationTemp),
        setTubeTemperature(operation.tubeTemp),
        setOverheatingTemperature(operation.overheatTemp));

      setValues({
        ...form,
        temp_saturacion: operation.saturationTemp,
        temp_tubo: operation.tubeTemp,
        temp_sobrecalentamiento: operation.overheatTemp,
        unidad: unit,
        refrigerante: refrigerant,
        CR: storeCr,
        id_usuario: userId,
      });
      setReadyToSend(true);
    }
  };

  const formattingForm = (form) => {
    const formattedForm = {
      CR: form.CR,
      id_usuario: form.id_usuario,
      unidad: form.unidad,
      refrigerante: form.refrigerante,
      presion_arranque: parseFloat(form.presion_arranque),
      presion_paro: parseFloat(form.presion_paro),
      presion_succion: parseFloat(form.presion_succion),
      resistencia_pt1000: parseFloat(form.resistencia_pt1000),
      temp_tubo: form.temp_tubo,
      temp_saturacion: form.temp_saturacion,
      temp_sobrecalentamiento: form.temp_sobrecalentamiento,
      temp_ambiente: parseFloat(form.temp_ambiente),
      aprobado: form.aprobado,
      comentarios: form.comentarios,
    };
    return formattedForm;
  };

  const sendOverheating = async (update, collection, id) => {
    //ordering and formatting the data
    const data = formattingForm(form);
    // console.log(data);

    const queryToSend = gql`
      mutation sendOverheating(
        $input: SobrecalentamientoInput!
        $collection: String!
      ) {
        addSobrecalentamiento(input: $input, collection: $collection) {
          id
          fecha_hora
        }
      }
    `;

    const queryToUpdate = gql`
      mutation updateOverheating(
        $input: SobrecalentamientoInput!
        $collection: String!
        $id: String!
      ) {
        updateSobrecalentamiento(
          input: $input
          collection: $collection
          id: $id
        ) {
          id
          fecha_hora
        }
      }
    `;

    const variablesToSend = {
      input: data,
      collection,
    };

    const variablesToUpdate = {
      input: data,
      collection,
      id,
    };

    await graphQLClient
      .request(
        update ? queryToUpdate : queryToSend,
        // eslint-disable-next-line comma-dangle
        update ? variablesToUpdate : variablesToSend
      )
      .then((data) => {
        // console.log(JSON.stringify(data, undefined, 2));
        if (update) {
          if (collection === 'sobrecalentamientos') {
            Swal.fire({
              icon: 'success',
              title: 'Datos de la primera revision actualizados',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Datos de la segunda revision actualizados',
            });
          }
        } else {
          if (collection === 'sobrecalentamientos') {
            Swal.fire({
              icon: 'success',
              title: 'Datos enviados',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Datos de la segunda revision enviados',
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar',
          text: 'Hubo un error al enviar. Por favor, reporta el problema.',
        });
      });
  };

  const avoidingDuplicate = async (collection) => {
    const query = gql`
      query validatingOverheating(
        $storeCR: String!
        $unit: String!
        $collection: String!
      ) {
        getSobrecalentamientoForValidation(
          storeCR: $storeCR
          unit: $unit
          collection: $collection
        ) {
          id
          temp_sobrecalentamiento
        }
      }
    `;

    const variables = {
      storeCR: storeCr,
      unit,
      collection,
    };

    const duplicated = await graphQLClient
      .request(query, variables)
      .then((data) => {
        // console.log(JSON.stringify(data, undefined, 2));
        if (
          data.getSobrecalentamientoForValidation.temp_sobrecalentamiento ===
          null
        ) {
          console.log('dato no repetido');
          return false;
        }
        console.log('dato repetido');
        duplicatedId = data.getSobrecalentamientoForValidation.id;
        // console.log('duplicatedId', duplicatedId);
        return true;
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error interno',
          text: 'Por favor, reporta el problema',
        });
      });
    setReadyToSend(false);
    return duplicated;
  };

  const sendData = async (e) => {
    const firstCollection = 'sobrecalentamientos';
    const secondCollection = 'SobrecalentamientosAdicionales';

    //checking if the data it is not duplicated in firstCollection
    if (await avoidingDuplicate(firstCollection)) {
      Swal.fire({
        title: 'Datos repetidos',
        text:
          'Este dato ya ha sido introducido en la primera visita. ¿Deseas actualizar la primera revision o agregarlo a la segunda revision?',
        icon: 'warning',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#3ed630',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Actualizar la primera revision',
        cancelButtonText: 'Agregarlo como segunda revision',
      }).then(async (result) => {
        if (result.value) {
          //updateOverheating in firstCollection
          sendOverheating(true, firstCollection, duplicatedId);
        } else if (result.dismiss === 'cancel') {
          //checking if the data it is not duplicated in secondCollection
          if (await avoidingDuplicate(secondCollection)) {
            Swal.fire({
              title: 'Datos repetidos',
              text:
                'Este dato ya ha sido introducido en la segunda revision. ¿Deseas actualizar la segunda revision?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3ed630',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Actualizar la segunda revision',
              cancelButtonText: 'Cancelar',
            }).then((result) => {
              if (result.value) {
                //updateOverheating in secondCollection
                sendOverheating(true, secondCollection, duplicatedId);
              } else if (result.dismiss === 'cancel') {
                Swal.fire({
                  title: 'Datos no enviados',
                  icon: 'info',
                });
              }
            });
          } else {
            //sendOverheating in secondCollection
            sendOverheating(false, secondCollection);
          }
        } else if (result.dismiss === 'close') {
          Swal.fire({
            title: 'Datos no enviados',
            icon: 'info',
          });
        }
      });
    } else {
      //sendOverheating in firstCollection
      sendOverheating(false, firstCollection);
    }
  };

  const confirmSubmit = (e) => {
    if (approved === 'No') {
      e.preventDefault();
      Swal.fire({
        title: 'Estas enviando datos no aprobados',
        text: '¿Deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, envialos',
        cancelButtonText: 'No enviar',
      }).then((result) => {
        if (result.value) {
          sendData();
        } else {
          Swal.fire({
            title: 'Datos no enviados',
            icon: 'info',
          });
        }
      });
    }
    if (approved === 'Si') {
      e.preventDefault();
      Swal.fire({
        title: 'Estas a punto de enviar datos.',
        text: '¿Deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, envialos',
        cancelButtonText: 'No enviar',
      }).then((result) => {
        if (result.value) {
          sendData();
        } else {
          Swal.fire({
            title: 'Datos no enviados',
            icon: 'info',
          });
        }
      });
    }
  };

  return (
    //eliminate userId id form and add ambient temperature, then add screen to change pass
    <>
      <div className='navigationContainer'>
        <Navigation
          onMain={true}
          direction='overheating'
          storecr={match.params.storecr}
          store={match.params.store}
        />
        <UserInfo />
      </div>
      <header>
        <h2>Calculadora de sobrecalentamiento</h2>
        <p>{unit}</p>
        <p>{refrigerant}</p>
        <p>{store.charAt(0) + store.slice(1).toLowerCase()}</p>
      </header>
      <form>
        <div className='field-container'>
          <h3>Presión de arranque del presostato</h3>
          <input
            name='presion_arranque'
            id='startPressure'
            type='number'
            placeholder='PSI'
            onChange={validationStartPressure}
            inputMode='decimal'
          />
        </div>
        <div className='field-container'>
          <h3>Presión de paro del presostato</h3>
          <input
            name='presion_paro'
            id='stopPressure'
            type='number'
            placeholder='PSI'
            onChange={validationStopPressure}
            inputMode='decimal'
          />
        </div>

        <div className='calculator'>
          <div className='field-container'>
            <h3>Presión de succión</h3>
            <input
              name='presion_succion'
              type='number'
              placeholder='PSI'
              onChange={handleInput}
              inputMode='decimal'
            />
          </div>
          <div className='field-container'>
            <h3>Resistencia PT1000</h3>
            <input
              name='resistencia_pt1000'
              type='number'
              placeholder='Ω'
              onChange={handleInput}
              inputMode='decimal'
            />
          </div>
          <div className='additionalData'>
            <div className='field-container'>
              <h3>Temperatura ambiente</h3>
              <input
                name='temp_ambiente'
                type='number'
                placeholder='°C'
                onChange={handleInput}
                inputMode='decimal'
              />
            </div>
            <div className='field-container'>
              <h3>Comentarios (opcional)</h3>
              <textarea
                name='comentarios'
                className='comments'
                onChange={handleInput}
              />
            </div>
          </div>
          <div className='validation-buttons-container'>
            <button type='button' onClick={calculate}>
              Calcular
            </button>
            {readyToSend ? (
              <button type='submit' onClick={confirmSubmit}>
                Enviar
              </button>
            ) : (
              <p>
                Se requiere calcular y validar los datos antes de poder
                enviarlos
              </p>
            )}
          </div>
          <div className='temperature-container'>
            <h3>Temperatura del tubo</h3>
            <p name='Temperatura del tubo' onChange={handleInput}>
              {`${tubeTemperature} °C`}
            </p>
          </div>
          <div className='temperature-container'>
            <h3>Temperatura de saturación</h3>
            <p name='Temperatura de saturación'>
              {`${saturationTemperature} °C`}
            </p>
          </div>
          <div className='main-temperature-container'>
            <h2>Temperatura de sobrecalentamiento</h2>
            {}
            <p id='overheatingTemp'>{`${overheatingTemperature} °C`}</p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Main;
