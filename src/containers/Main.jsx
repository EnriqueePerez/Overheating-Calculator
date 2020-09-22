import React, { useState, useEffect } from 'react';
import '../assets/styles/components/Main.scss';
import Swal from 'sweetalert2';
import {
  validateStopPressure,
  validateStartPressure,
  calculation,
  validateOverheatingTemperature,
} from '../utils/validation';
import Navigation from './Navigation';

const Main = ({ match }) => {
  const [user, setUser] = useState(9);
  const [unit, setUnit] = useState('Sin Unidad');
  const [refrigerant, setRefrigerant] = useState('Sin Refrigerante');
  const [store, setStore] = useState('Sin tienda');
  const [storeCr, setStoreCr] = useState('');
  // /?unit=conservacion&refrigerant=R404a

  const [tubeTemperature, setTubeTemperature] = useState(0);
  const [saturationTemperature, setSaturationTemperature] = useState(0);
  const [overheatingTemperature, setOverheatingTemperature] = useState(0);
  const [approved, setApproved] = useState(0);
  const [readyToSend, setReadyToSend] = useState(false);
  const [form, setValues] = useState({ comentarios: 'Sin comentarios' });

  const generalValidation = () => {
    if (
      document.querySelector('#startPressure').style.backgroundColor ===
        'rgb(136, 252, 136)' &&
      document.querySelector('#stopPressure').style.backgroundColor ===
        'rgb(136, 252, 136)' &&
      document.getElementById('overheatingTemp').style.color === 'green'
    ) {
      setApproved(1);
      // console.log(approved);
    } else {
      setApproved(0);
      // console.log(approved);
    }
    setValues({
      ...form,
      aprobado: approved,
    });
  };

  useEffect(() => {
    validateOverheatingTemperature(overheatingTemperature, unit);
    setUnit(match.params.unit);
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
        unidad: `${unit} ${match.params.unitnumber}`,
        refrigerante: refrigerant,
        CR: storeCr,
        id_usuario: user,
      });
      setReadyToSend(true);
    }
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
          fetch(`${process.env.SERVER_IP}/api/data`, {
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
          fetch(`${process.env.SERVER_IP}/api/data/secondary`, {
            method: 'POST',
            body: JSON.stringify(form),
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
    console.log(form);
    fetch(`${process.env.SERVER_IP}/api/data`, {
      method: 'POST',
      body: JSON.stringify(form),
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
          text: error,
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

  const handleUserInput = (e) => {
    const index = e.target.selectedIndex; //Getting the index of the selected element
    const optionElement = e.target.childNodes[index]; //Getting the html line of the element;
    const id = optionElement.getAttribute('id'); //Getting the id attribute from the HTML line
    // console.log(id);
    setUser(id);
  };

  return (
    <>
      <Navigation />
      <header>
        <h2>Calculadora de sobrecalentamiento</h2>
        <p>{`${unit} ${match.params.unitnumber}`}</p>
        <p>{refrigerant}</p>
        <p>{store.charAt(0) + store.slice(1).toLowerCase()}</p>
      </header>
      <form>
        <div className='field-container'>
          <h3>Usuario</h3>
          <div className='user-dropdown'>
            <select onChange={handleUserInput}>
              <option id='9' value='Admin'>
                Seleccionar usuario
              </option>
              <option id='1' value='Mario Enrique'>
                Mario Enrique
              </option>
              <option id='2' value='Alberto Zaid'>
                Alberto Zaid
              </option>
              <option id='3' value='Juan Carlos'>
                Juan Carlos
              </option>
              <option id='4' value='Jesus'>
                Jesus
              </option>
              <option id='5' value='Elias'>
                Elias
              </option>
              <option id='6' value='Alexis'>
                Alexis
              </option>
              <option id='7' value='José Abraham'>
                José Abraham
              </option>
              <option id='8' value='Francisco'>
                Francisco
              </option>
            </select>
          </div>
        </div>
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
          <div className='field-container'>
            <h3>Comentarios (opcional)</h3>
            <textarea
              name='comentarios'
              className='comments'
              onChange={handleInput}
            />
          </div>
          <div className='field-container'>
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
