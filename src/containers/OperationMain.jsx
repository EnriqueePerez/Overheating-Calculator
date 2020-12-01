import React, { useState, useEffect } from 'react';
import '../assets/styles/components/OperationMain.scss';
import Swal from 'sweetalert2';
import {
  validatePercentage,
  validateCycles,
  calculateDeltaAndTolerances,
} from '../utils/operationValidation';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import { verifyUser } from '../utils/userContext';

const OperationMain = ({ match, history }) => {
  const [user, setUser] = useState(9);
  const [unit, setUnit] = useState('Sin Unidad');
  const [refrigerant, setRefrigerant] = useState('Sin Refrigerante');
  const [store, setStore] = useState('Sin tienda');
  const [storeCr, setStoreCr] = useState('');
  // /?unit=conservacion&refrigerant=R404a

  const [percentageCheck, setPercentageCheck] = useState(
    // eslint-disable-next-line comma-dangle
    'Esperando Validación'
  );
  const [cyclesCheck, setCyclesCheck] = useState('Esperando Validación');
  const [delta, setDelta] = useState(0);
  // const [approved, setApproved] = useState(0);
  const [readyToSend, setReadyToSend] = useState(false);
  const [form, setValues] = useState({
    comentarios: 'Sin comentarios',
    aprobado: 'si',
    retorno: undefined,
    inyeccion: undefined,
    porcentaje_evaporador: undefined,
    ciclos_evaporador: undefined,
    porcentaje_condensador: undefined,
    ciclos_condensador: undefined,
    delta: '',
    unidad: 'Sin unidad',
    refrigerante: 'Sin refrigerante',
    CR: 'AAA',
    id_usuario: 9,
  });

  // const generalValidation = () => {
  //   if (
  //     document.querySelector('#startPressure').style.backgroundColor ===
  //       'rgb(136, 252, 136)' &&
  //     document.querySelector('#stopPressure').style.backgroundColor ===
  //       'rgb(136, 252, 136)' &&
  //     document.getElementById('overheatingTemp').style.color === 'green'
  //   ) {
  //     setApproved(1);
  //     // console.log(approved);
  //   } else {
  //     setApproved(0);
  //     // console.log(approved);
  //   }
  //   setValues({
  //     ...form,
  //     aprobado: approved,
  //   });
  // };

  const handleUserInput = (e) => {
    verifyUser()
      .then((r) => {
        setUser(r.user.id);
      })
      .catch(() => console.log('No Autenticado'));
  };

  const percentageAndCycleCheck = (e) => {
    const percentageCheck = document
      .getElementById('percentageCheck')
      .getAttribute('value');
    const cycleCheck = document
      .getElementById('cycleCheck')
      .getAttribute('value');

    if (percentageCheck === 'Aprobado') {
      document.getElementById('percentageCheck').style.color = '#88fc88';
    } else {
      document.getElementById('percentageCheck').style.color = '#fa6b6b';
    }

    if (cycleCheck === 'Aprobado') {
      document.getElementById('cycleCheck').style.color = '#88fc88';
    } else {
      document.getElementById('cycleCheck').style.color = '#fa6b6b';
    }
  };

  const validateDelta = () => {
    if (delta >= 2.5 && delta <= 5) {
      document.getElementById('delta').style.color = '#88fc88';
    } else {
      document.getElementById('delta').style.color = '#fa6b6b';
    }
  };

  useEffect(() => {
    handleUserInput();
    percentageAndCycleCheck();
    validateDelta();
    setUnit(match.params.unit);
    setRefrigerant(match.params.refrigerant);
    setStoreCr(match.params.storecr);
    setStore(match.params.store);
    // generalValidation();
  }, [readyToSend, delta]); //return approved after enabling database

  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
    setReadyToSend(false);
  };

  const validatingPercentage = (e) => {
    const aprobado = validatePercentage(e.target.value);
    aprobado
      ? (document.getElementById(e.target.id).style.backgroundColor = '#88fc88')
      : (document.getElementById(e.target.id).style.backgroundColor =
          '#fa6b6b');
    handleInput(e);
  };

  const validatingCycles = (e) => {
    const aprobado = validateCycles(e.target.value);
    aprobado
      ? (document.getElementById(e.target.id).style.backgroundColor = '#88fc88')
      : (document.getElementById(e.target.id).style.backgroundColor =
          '#fa6b6b');
    handleInput(e);
  };

  const calculate = () => {
    if (
      form.retorno === undefined ||
      form.inyeccion === undefined ||
      form.porcentaje_evaporador === undefined ||
      form.porcentaje_evaporador === undefined ||
      form.ciclos_evaporador === undefined ||
      form.ciclos_condensador === undefined
    ) {
      Swal.fire({
        title: 'Faltan campos por rellenar',
        icon: 'error',
      });
    } else if (
      form.retorno === '' ||
      form.inyeccion === '' ||
      form.porcentaje_evaporador === '' ||
      form.porcentaje_evaporador === '' ||
      form.ciclos_evaporador === '' ||
      form.ciclos_condensador === ''
    ) {
      Swal.fire({
        title: 'Faltan campos por rellenar',
        icon: 'error',
      });
    } else {
      const operation = calculateDeltaAndTolerances(
        form.retorno,
        form.inyeccion,
        form.porcentaje_evaporador,
        form.porcentaje_condensador,
        form.ciclos_evaporador,
        form.ciclos_condensador
      );
      console.log(operation);
      console.log(form);
      if (operation === false) {
        setReadyToSend(false);
        Swal.fire({
          title: 'El retorno no puede ser menor que la inyección',
          icon: 'error',
        });
      } else {
        setPercentageCheck(operation.percentageValue);
        setCyclesCheck(operation.cycleValue);
        setDelta(operation.delta);
        setValues({
          ...form,
          delta: operation.delta,
          unidad: `${unit} ${match.params.unitnumber}`,
          refrigerante: refrigerant,
          CR: storeCr,
          id_usuario: user,
        });
        setReadyToSend(true);
      }

      // const operation = calculation(
      //   refrigerant,
      //   form.presion_succion,
      //   // eslint-disable-next-line comma-dangle
      //   form.resistencia_pt1000
      // );
      // operation &&
      //   (setSaturationTemperature(operation.saturationTemp),
      //   setTubeTemperature(operation.tubeTemp),
      //   setOverheatingTemperature(operation.overheatTemp));
    }
  };

  const formattingForm = (form) => {
    const formattedForm = {
      comentarios: form.comentarios,
      aprobado: form.aprobado,
      presion_arranque: form.presion_arranque,
      presion_paro: form.presion_paro,
      presion_succion: form.presion_succion,
      resistencia_pt1000: form.resistencia_pt1000,
      temp_saturacion: form.temp_saturacion,
      temp_tubo: form.temp_tubo,
      temp_sobrecalentamiento: form.temp_sobrecalentamiento,
      unidad: form.unidad,
      refrigerante: form.refrigerante,
      CR: form.CR,
      id_usuario: form.id_usuario,
      temp_ambiente: form.temp_ambiente,
    };
    return formattedForm;
  };

  const validatingResponse = (status) => {
    if (status === 409) {
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
      }).then((result) => {
        // console.log(result);
        if (result.value) {
          //actualizar data
          const data = formattingForm(form);
          fetch(`${process.env.SERVER_IP}/api/data`, {
            method: 'PUT',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (res.status === 202) {
                Swal.fire({
                  icon: 'success',
                  title: 'Datos de la primera revision actualizados',
                });
              } else if (status === 500) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al enviar',
                  text:
                    'Hubo un error al enviar. Por favor, reporta el problema.',
                });
              }
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Error al enviar',
                text:
                  'Hubo un error al enviar. Por favor, reporta el problema.',
              });
            });
        } else if (result.dismiss === 'cancel') {
          //introducir en dataSecondary
          const data = formattingForm(form);
          fetch(`${process.env.SERVER_IP}/api/data/secondary`, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (res.status === 201) {
                Swal.fire({
                  icon: 'success',
                  title: 'Datos de la segunda revision enviados',
                });
              } else if (res.status === 409) {
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
                    fetch(`${process.env.SERVER_IP}/api/data/secondary`, {
                      method: 'PUT',
                      body: JSON.stringify(form),
                      mode: 'cors',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    })
                      .then((res) => {
                        if (res.status === 202) {
                          Swal.fire({
                            icon: 'success',
                            title: 'Datos de la segunda revision actualizados',
                          });
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                        Swal.fire({
                          icon: 'error',
                          title: 'Error al enviar',
                          text:
                            'Hubo un error al enviar. Por favor, reporta el problema.',
                        });
                      });
                  }
                });
              } else if (res.status === 500) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error al enviar',
                  text:
                    'Hubo un error al enviar. Por favor, reporta el problema.',
                });
              }
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Error al enviar',
                text:
                  'Hubo un error al enviar. Por favor, reporta el problema.',
              });
            });
        } else if (result.dismiss === 'close') {
          Swal.fire({
            title: 'Datos no enviados',
            icon: 'info',
          });
        }
      });
    } else if (status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Datos enviados',
      });
    } else if (status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar',
        text:
          'Hubo un error interno al enviar. Por favor, reporta el problema.',
      });
    }
  };

  const sendData = (e) => {
    //When send, turn off button
    // generalValidation();
    // e.preventDefault();
    const data = formattingForm(form);
    // console.log(user);
    // console.log(data);
    // alert(JSON.stringify(formattedForm));
    fetch(`${process.env.SERVER_IP}/api/data`, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        validatingResponse(res.status);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar',
          text: 'Hubo un error al enviar. Por favor, reporta el problema.',
        });
      });
    setReadyToSend(false);
  };

  const confirmSubmit = (e) => {
    if (!approved) {
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
          sendData(e);
        } else {
          Swal.fire({
            title: 'Datos no enviados',
            icon: 'info',
          });
        }
      });
    }
    if (approved) {
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
          sendData(e);
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
    <>
      <div className='navigationContainer'>
        <Navigation />
        <UserInfo />
      </div>
      <header>
        <h2>Eficiencia de Equipo</h2>
        <p>{`${unit} ${match.params.unitnumber}`}</p>
        <p>{refrigerant}</p>
        <p>{store.charAt(0) + store.slice(1).toLowerCase()}</p>
      </header>
      <form>
        <h2>Delta</h2>
        <div className='field-container'>
          <h3>Sensor de Retorno</h3>
          <input
            name='retorno'
            id='retorno'
            placeholder='°C'
            type='number'
            onChange={handleInput}
            inputMode='decimal'
          />
        </div>
        <div className='field-container'>
          <h3>Sensor de Inyección</h3>
          <input
            name='inyeccion'
            id='inyeccion'
            placeholder='°C'
            type='number'
            onChange={handleInput}
            inputMode='decimal'
          />
        </div>
        <h2>Evaporador</h2>
        <div className='field-container'>
          <h3>Porcentaje</h3>
          <input
            name='porcentaje_evaporador'
            id='evaporatorPercentage'
            type='number'
            placeholder='%'
            onChange={validatingPercentage}
            inputMode='decimal'
          />
        </div>
        <div className='field-container'>
          <h3>Ciclos</h3>
          <input
            name='ciclos_evaporador'
            id='evaporatorCycles'
            type='number'
            onChange={validatingCycles}
            inputMode='decimal'
          />
        </div>

        <h2>Condensador</h2>
        <div className='field-container'>
          <h3>Porcentaje</h3>
          <input
            name='porcentaje_condensador'
            id='condenserPercentage'
            type='number'
            placeholder='%'
            onChange={validatingPercentage}
            inputMode='decimal'
          />
        </div>
        <div className='field-container'>
          <h3>Ciclos</h3>
          <input
            name='ciclos_condensador'
            id='condenserCycles'
            type='number'
            onChange={validatingCycles}
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
        <div className='validation-buttons-container'>
          <button type='button' onClick={calculate}>
            Validar Datos
          </button>
          {/* {readyToSend ? (
            <button type='submit' onClick={confirmSubmit}>
              Enviar
            </button>
          ) : (
            <p>
              Se requiere calcular y validar los datos antes de poder enviarlos
            </p>
          )} */}
        </div>
        <div className='percentage-check-container'>
          <h3>Porcentaje</h3>
          <p value={percentageCheck} id='percentageCheck'>
            {percentageCheck}
          </p>
        </div>
        <div className='cycle-check-container'>
          <h3>Ciclos</h3>
          <p value={cyclesCheck} id='cycleCheck'>
            {cyclesCheck}
          </p>
        </div>
        <div className='delta-container'>
          <h2>Delta</h2>
          <p id='delta'>{delta}</p>
        </div>
      </form>
    </>
  );
};

export default OperationMain;
