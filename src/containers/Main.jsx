import React, { useState, useEffect } from 'react';
import '../assets/styles/components/Main.scss';
import {
  validateStopPressureR404,
  validateStartPressureR404,
  calculation,
} from '../utils/validation';

const Main = (props) => {
  const [approved, setApproved] = useState(false);
  const [tubeTemperature, setTubeTemperature] = useState(0);
  const [saturationTemperature, setSaturationTemperature] = useState(0);
  const [overheatingTemperature, setOverheatingTemperature] = useState(0);
  const [form, setValues] = useState({});

  useEffect(() => {
    if (overheatingTemperature > 12 && overheatingTemperature < 17) {
      document.getElementById('overheatingTemp').style.color = 'green';
    }
    if (overheatingTemperature <= 12 || overheatingTemperature >= 17) {
      document.getElementById('overheatingTemp').style.color = 'red';
    }
  });

  const handleInput = (e) => {
    setValues({
      ...form,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const validationStartPressure = (e) => {
    validateStartPressureR404(e);
    if (validateStartPressureR404(e)) {
      setApproved(true);
      handleInput(e);
    } else {
      setApproved(false);
      handleInput(e);
    }
  };

  const validationStopPressure = (e) => {
    validateStopPressureR404(e);
    if (validateStopPressureR404(e)) {
      setApproved(true);
      handleInput(e);
    } else {
      setApproved(false);
      handleInput(e);
    }
  };

  const unit = 'Conservación';
  const refrigerant = 'R404a';
  // /?unit=conservacion&refrigerant=R404a
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
        Unidad: unit,
        Refrigerante: refrigerant,
      });
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
            <button
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                console.log(form);
              }}
            >
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
