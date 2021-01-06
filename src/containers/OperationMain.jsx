import React, { useState, useEffect } from 'react';
import '../assets/styles/components/OperationMain.scss';
import Swal from 'sweetalert2';
import {
  validatePercentage,
  validateCycles,
  calculateDeltaAndTolerances,
  validateGeneralData,
} from '../utils/operationValidation';
import Navigation from './Navigation';
import UserInfo from './UserInfo';
import { verifyUser } from '../utils/userContext';

const OperationMain = ({ match, history }) => {
  const [user, setUser] = useState(9);
  const [unit, setUnit] = useState('Sin Unidad');
  const [store, setStore] = useState('Sin tienda');
  const [storeCr, setStoreCr] = useState('');
  // /?unit=conservacion&refrigerant=R404a

  const [percentageCheck, setPercentageCheck] = useState(
    // eslint-disable-next-line comma-dangle
    'Esperando Validación'
  );
  const [cyclesCheck, setCyclesCheck] = useState('Esperando Validación');
  const [delta, setDelta] = useState(0);
  const [approved, setApproved] = useState('No');
  const [readyToSend, setReadyToSend] = useState(false);
  const [secondReturn, setsecondReturn] = useState(false);
  const [form, setValues] = useState({
    comentarios: 'Sin comentarios',
    aprobado: 'No',
    retorno: undefined,
    inyeccion: undefined,
    retorno2: '0',
    inyeccion2: '0',
    porcentaje_evaporador: undefined,
    ciclos_evaporador: undefined,
    porcentaje_condensador: undefined,
    ciclos_condensador: undefined,
    delta: '',
    unidad: 'Sin unidad',
    CR: 'AAA',
    id_usuario: 9,
  });

  const generalValidation = () => {
    const validation = validateGeneralData();
    if (validation) {
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
    if (unit === 'Clima') {
      if (delta >= 10 && delta <= 15) {
        document.getElementById('delta').style.color = '#88fc88';
      } else {
        document.getElementById('delta').style.color = '#fa6b6b';
      }
    } else {
      if (delta >= 2.5 && delta <= 5) {
        document.getElementById('delta').style.color = '#88fc88';
      } else {
        document.getElementById('delta').style.color = '#fa6b6b';
      }
    }
  };

  const enableSecondReturn = () => {
    if (
      `${match.params.unit} ${match.params.unitnumber}` === 'Conservacion 2'
    ) {
      setsecondReturn(true);
    }
  };

  useEffect(() => {
    enableSecondReturn();
    handleUserInput();
    percentageAndCycleCheck();
    validateDelta();
    setUnit(match.params.unit);
    setStoreCr(match.params.storecr);
    setStore(match.params.store);
    generalValidation();
  }, [approved, readyToSend, delta]); //return approved after enabling database

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
      if (secondReturn && (form.retorno2 === '' || form.inyeccion2 === '')) {
        Swal.fire({
          title: 'Faltan campos por rellenar',
          icon: 'error',
        });
      }
      const operation = calculateDeltaAndTolerances(
        form.retorno,
        form.inyeccion,
        form.retorno2,
        form.inyeccion2,
        form.porcentaje_evaporador,
        form.porcentaje_condensador,
        form.ciclos_evaporador,
        form.ciclos_condensador
      );
      // console.log(operation);
      // console.log(form);
      if (operation === false) {
        setReadyToSend(false);
        Swal.fire({
          title: 'El retorno no puede ser menor o igual que la inyección',
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
          CR: storeCr,
          id_usuario: user,
        });
        setReadyToSend(true);
      }
    }
  };

  const formattingForm = (form) => {
    const formattedForm = {
      comentarios: form.comentarios,
      aprobado: form.aprobado,
      retorno: form.retorno,
      inyeccion: form.inyeccion,
      retorno2: form.retorno2,
      inyeccion2: form.inyeccion2,
      porcentaje_evaporador: form.porcentaje_evaporador,
      ciclos_evaporador: form.ciclos_evaporador,
      porcentaje_condensador: form.porcentaje_condensador,
      ciclos_condensador: form.ciclos_condensador,
      delta: form.delta,
      unidad: form.unidad,
      CR: form.CR,
      id_usuario: form.id_usuario,
    };
    return formattedForm;
  };

  const validatingResponse = (status) => {
    if (status === 409) {
      Swal.fire({
        title: 'Datos repetidos',
        text: 'Este dato ya ha sido introducido ¿Deseas actualizar los datos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3ed630',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Actualizar datos',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        // console.log(result);
        if (result.value) {
          //actualizar data
          const data = formattingForm(form);
          fetch(`${process.env.SERVER_IP}/api/operation`, {
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
                  title: 'Datos actualizados',
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
    // console.log(form);
    // console.log(user);
    // console.log(data);
    // alert(JSON.stringify(formattedForm));
    fetch(`${process.env.SERVER_IP}/api/operation`, {
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
    // const validation = validateGeneralData;
    // if (validation) {
    //   setApproved('Si') &&
    //     setValues({
    //       ...form,
    //       aprobado: 'Si',
    //     });
    // } else {
    //   setApproved('No') &&
    //     setValues({
    //       ...form,
    //       aprobado: 'No',
    //     });
    // }
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
          sendData(e);
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
        <h2>Eficiencia de Trabajo</h2>
        <p>{`${unit} ${match.params.unitnumber}`}</p>
        <p>{store.charAt(0) + store.slice(1).toLowerCase()}</p>
      </header>
      <form>
        <h2>Delta</h2>
        <div className='field-container'>
          <h3>Sensor de Retorno</h3>
          <input
            name='retorno'
            id='retorno1'
            placeholder='°C'
            type='text'
            onChange={handleInput}
            inputMode='text'
          />
        </div>
        <div className='field-container'>
          <h3>Sensor de Inyección</h3>
          <input
            name='inyeccion'
            id='inyeccion1'
            placeholder='°C'
            type='text'
            onChange={handleInput}
            inputMode='text'
          />
        </div>
        {secondReturn ? (
          <>
            <div className='field-container'>
              <h3>Sensor de Retorno 2</h3>
              <input
                name='retorno2'
                id='retorno2'
                placeholder='°C'
                type='text'
                onChange={handleInput}
                inputMode='text'
              />
            </div>
            <div className='field-container'>
              <h3>Sensor de Inyección 2</h3>
              <input
                name='inyeccion2'
                id='inyeccion2'
                placeholder='°C'
                type='text'
                onChange={handleInput}
                inputMode='text'
              />
            </div>
          </>
        ) : null}

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
          {readyToSend ? (
            <button type='submit' onClick={confirmSubmit}>
              Enviar
            </button>
          ) : (
            <p>
              Se requiere calcular y validar los datos antes de poder enviarlos
            </p>
          )}
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
        <div className='cycle-check-container'>
          <h3>Delta</h3>
          <p id='delta'>{delta}</p>
        </div>
        <div className='unit-status'>
          <h2>Estado del Equipo</h2>
          {approved === 'No' ? (
            <p style={{ color: '#fa6b6b' }}>Fuera de especificación</p>
          ) : (
            <p style={{ color: '#88fc88' }}>Aprobado</p>
          )}
        </div>
      </form>
    </>
  );
};

export default OperationMain;
