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
  // /?unit=conservacion&refrigerant=R404a

  const [tubeTemperature, setTubeTemperature] = useState(0);
  const [saturationTemperature, setSaturationTemperature] = useState(0);
  const [overheatingTemperature, setOverheatingTemperature] = useState(0);
  const [approved, setApproved] = useState(0);
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
      console.log(approved);
    } else {
      setApproved(0);
      console.log(approved);
    }
    setValues({
      ...form,
      Aprovado: approved,
    });
  };

  useEffect(() => {
    validateOverheatingTemperature(overheatingTemperature, unit);
    setUnit(match.params.unit);
    setRefrigerant(match.params.refrigerant);
    generalValidation();
  }, [approved, overheatingTemperature]);

  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: parseFloat(e.target.value),
    });
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
      form.Presion_de_succion === undefined ||
      form.Resistencia_PT1000 === undefined
    ) {
      alert('Faltan campos por rellenar');
    } else if (
      form.Presion_de_succion === '' ||
      form.Resistencia_PT1000 === ''
    ) {
      alert('Faltan campos por rellenar');
    } else {
      const operation = calculation(
        refrigerant,
        form.Presion_de_succion,
        // eslint-disable-next-line comma-dangle
        form.Resistencia_PT1000
      );
      operation &&
        (setSaturationTemperature(operation.saturationTemp),
        setTubeTemperature(operation.tubeTemp),
        setOverheatingTemperature(operation.overheatTemp));

      setValues({
        ...form,
        Temperatura_de_Saturacion: operation.saturationTemp,
        Temperatura_del_Tubo: operation.tubeTemp,
        Temperatura_de_Sobrecalentamiento: operation.overheatTemp,
        Unidad: `${unit} ${match.params.unitnumber}`,
        Refrigerante: refrigerant,
      });
    }
  };

  const sendData = (e) => {
    // generalValidation();
    e.preventDefault();
    const data = JSON.stringify(form);
    fetch('http://localhost:5000', {
      method: 'POST',
      body: data,
      mode: 'no-cors',
    })
      .then((res) => console.log(res))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <>
      <Navigation />
      <header>
        <h2>Calculadora de sobrecalentamiento</h2>
        <p>{`${unit} ${match.params.unitnumber}`}</p>
        <p>{refrigerant}</p>
      </header>
      <form>
        <div className='field-container'>
          <h3>Presión de arranque del presostato</h3>
          <input
            name='Presion_de_arranque_del_presostato'
            id='startPressure'
            type='number'
            placeholder='PSI'
            onChange={validationStartPressure}
          />
        </div>
        <div className='field-container'>
          <h3>Presión de corte del presostato</h3>
          <input
            name='Presion_de_paro_del_presostato'
            id='stopPressure'
            type='number'
            placeholder='PSI'
            onChange={validationStopPressure}
          />
        </div>

        <div className='calculator'>
          <div className='field-container'>
            <h3>Presión de succión</h3>
            <input
              name='Presion_de_succion'
              type='number'
              placeholder='PSI'
              onChange={handleInput}
            />
          </div>
          <div className='field-container'>
            <h3>Resistencia PT1000</h3>
            <input
              name='Resistencia_PT1000'
              type='number'
              placeholder='Ω'
              onChange={handleInput}
            />
          </div>
          <div className='field-container'>
            <button type='button' onClick={calculate}>
              Calcular
            </button>
            <button type='submit' onClick={sendData}>
              Enviar
            </button>
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
