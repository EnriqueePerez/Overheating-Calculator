import React, { useState } from 'react';
import '../assets/styles/components/Main.scss';
import {
  validateStopPressureR404,
  validateCutPressureR404,
} from '../utils/validation';

const Main = (props) => {
  const [approved, setApproved] = useState(false);
  const validationCutPressure = (e) => {
    validateCutPressureR404(e);
    if (validateCutPressureR404(e)) {
      setApproved(true);
    } else {
      setApproved(false);
    }
  };
  const validationStopPressure = (e) => {
    validateStopPressureR404(e);
    if (validateStopPressureR404(e)) {
      setApproved(true);
    } else {
      setApproved(false);
    }
  };
  const tubeTemperature = 21;
  const saturationTemperature = 25;
  const overheatingTemperature = 22;
  // /?unit=conservacion&refrigerant=R404a
  return (
    <>
      <header>
        <h2>Calculadora de sobrecalentamiento</h2>
        <p>Conservacion</p>
        <p>R404a</p>
      </header>
      <form>
        <div className='field-container'>
          <h3>Presión de corte del presostato</h3>
          <input
            id='cutPressure'
            type='number'
            placeholder='PSI'
            onChange={validationCutPressure}
          />
        </div>
        <div className='field-container'>
          <h3>Presión de arranque del presostato</h3>
          <input
            id='stopPressure'
            type='number'
            placeholder='PSI'
            onChange={validationStopPressure}
          />
        </div>
        <div className='calculator'>
          <div className='field-container'>
            <h3>Presión</h3>
            <input type='number' placeholder='PSI' />
          </div>
          <div className='field-container'>
            <h3>Resistencia</h3>
            <input type='number' placeholder='Ω' />
          </div>
          <div className='field-container'>
            <button type='submit'>Calcular</button>
          </div>
          <div className='temperature-container'>
            <h3>Temperatura del tubo</h3>
            <p>{`${tubeTemperature}°C`}</p>
          </div>
          <div className='temperature-container'>
            <h3>Temperatura de saturación</h3>
            <p>{`${saturationTemperature}°C`}</p>
          </div>
          <div className='main-temperature-container'>
            <h2>Temperatura de sobrecalentamiento</h2>
            <p>{`${overheatingTemperature}°C`}</p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Main;
