import React, { useState } from 'react';
import '../assets/styles/components/Main.scss';
import {
  validateStopPressureR404,
  validateCutPressureR404,
  validateOverheatingTemperature,
  calculation,
} from '../utils/validation';

const Main = (props) => {
  const [approved, setApproved] = useState(false);
  const [tubeTemperature, setTubeTemperature] = useState(0);
  const [saturationTemperature, setSaturationTemperature] = useState(0);
  const [overheatingTemperature, setOverheatingTemperature] = useState(0);
  const [form, setValues] = useState({});
  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const validationCutPressure = (e) => {
    validateCutPressureR404(e);
    if (validateCutPressureR404(e)) {
      setApproved(true);
      handleInput(e);
    } else {
      setApproved(false);
    }
  };

  const validationStopPressure = (e) => {
    validateStopPressureR404(e);
    if (validateStopPressureR404(e)) {
      setApproved(true);
      handleInput(e);
    } else {
      setApproved(false);
    }
  };

  const validationOverheating = (e) => {
    validateOverheatingTemperature(e);
    handleInput(e);
  };

  const unit = 'Conservación';
  const refrigerant = 'R404a';
  // /?unit=conservacion&refrigerant=R404a

  const calculate = () => {
    if (form.Presion === undefined || form.Resistencia === undefined) {
      alert('Faltan campos por rellenar');
    } else if (form.Presion === '' || form.Resistencia === '') {
      alert('Faltan campos por rellenar');
    } else {
      const operation = calculation(
        refrigerant,
        form.Presion,
        form.Resistencia
      );
      operation &&
        (setSaturationTemperature(operation.saturationTemp),
        setTubeTemperature(operation.tubeTemp),
        setOverheatingTemperature(operation.overheatTemp),
        setValues({
          ...form,
          'Temperatura de Saturacion': operation.saturationTemp,
          'Temperatura del Tubo': operation.tubeTemp,
          'Temperatura de Sobrecalentamiento': operation.overheatTemp,
        }));
      console.log(form);
    }
  };

  return (
    <>
      <header>
        <h2>Calculadora de sobrecalentamiento</h2>
        <p>{unit}</p>
        <p>{refrigerant}</p>
      </header>
      <form>
        <div className='field-container'>
          <h3>Presión de corte del presostato</h3>
          <input
            name='Presion de corte del presostato'
            id='cutPressure'
            type='number'
            placeholder='PSI'
            onChange={validationCutPressure}
          />
        </div>
        <div className='field-container'>
          <h3>Presión de arranque del presostato</h3>
          <input
            name='Presion de arranque del presostato'
            id='stopPressure'
            type='number'
            placeholder='PSI'
            onChange={validationStopPressure}
          />
        </div>
        <div className='calculator'>
          <div className='field-container'>
            <h3>Presión</h3>
            <input
              name='Presion'
              type='number'
              placeholder='PSI'
              onChange={handleInput}
            />
          </div>
          <div className='field-container'>
            <h3>Resistencia</h3>
            <input
              name='Resistencia'
              type='number'
              placeholder='Ω'
              onChange={handleInput}
            />
          </div>
          <div className='field-container'>
            <button type='button' onClick={calculate}>
              Calcular
            </button>
          </div>
          <div className='temperature-container'>
            <h3>Temperatura del tubo</h3>
            <p name='Temperatura del tubo' onChange={handleInput}>
              {`${tubeTemperature}°C`}
            </p>
          </div>
          <div className='temperature-container'>
            <h3>Temperatura de saturación</h3>
            <p name='Temperatura de saturación'>
              {`${saturationTemperature}°C`}
            </p>
          </div>
          <div className='main-temperature-container'>
            <h2>Temperatura de sobrecalentamiento</h2>
            <p id='overheatingTemp'>{`${overheatingTemperature}°C`}</p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Main;
