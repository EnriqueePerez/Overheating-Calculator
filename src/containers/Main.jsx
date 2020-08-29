import React, { useState, useEffect } from 'react';
import '../assets/styles/components/Main.scss';
import {
  validateStopPressure,
  validateStartPressure,
  calculation,
  validateOverheatingTemperature,
} from '../utils/validation';
import Navigation from './Navigation';

const Main = ({ match }) => {
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
  const [form, setValues] = useState({});

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
      [e.target.name]: parseFloat(e.target.value),
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
      alert('Faltan campos por rellenar');
    } else if (form.presion_succion === '' || form.resistencia_pt1000 === '') {
      alert('Faltan campos por rellenar');
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
        comentarios: 'Sin comentarios',
        id_usuario: 9,
      });
      setReadyToSend(true);
    }
  };

  const sendData = (e) => {
    //When send, turn off button
    // generalValidation();
    e.preventDefault();
    const data = JSON.stringify(form);
    console.log(data);
    fetch(`${process.env.SERVER_IP}/api/data`, {
      method: 'POST',
      body: data,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => console.log(res.status))
      // .then((r) => console.log(r))
      .catch((error) => console.error('Error:', error));
    setReadyToSend(false);
  };

  const confirmSubmit = (e) => {
    if (!approved) {
      const agree = window.confirm(
        // eslint-disable-next-line comma-dangle
        'Estas enviando datos no aprobados. ¿Deseas continuar?'
      );
      agree ? sendData(e) : (alert('Datos no enviados'), e.preventDefault());
    }
    if (approved) {
      const agree = window.confirm(
        // eslint-disable-next-line comma-dangle
        'Estas a punto de enviar datos. ¿Deseas continuar?'
      );
      agree ? sendData(e) : (alert('Datos no enviados'), e.preventDefault());
    }
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
