export const validateStartPressureR404 = (e) => {
  if (e.target.value >= 63 && e.target.value <= 77) {
    document.querySelector('#startPressure').style.backgroundColor = '#88fc88'; //green
    // console.log('APROVADO');
    return true;
  }
  document.querySelector('#startPressure').style.backgroundColor = '#fa6b6b'; //red
  // console.log('RECHAZADO');
  return false;
};

export const validateStopPressureR404 = (e) => {
  if (e.target.value >= 36 && e.target.value <= 44) {
    document.querySelector('#stopPressure').style.backgroundColor = '#88fc88'; //green
    // console.log('APROVADO');
    return true;
  }
  document.querySelector('#stopPressure').style.backgroundColor = '#fa6b6b'; //red
  // console.log('RECHAZADO');
  return false;
};

export const validateOverheatingTemperature = (overheatingTemp, unit) => {
  switch (unit) {
    case 'Conservacion':
    case 'Cerveza': {
      if (overheatingTemp > 12 && overheatingTemp < 17) {
        document.getElementById('overheatingTemp').style.color = 'green';
      }
      if (overheatingTemp <= 12 || overheatingTemp >= 17) {
        document.getElementById('overheatingTemp').style.color = 'red';
      }
      break;
    }
    case 'Hielo': {
      if (overheatingTemp > 12 && overheatingTemp < 30) {
        document.getElementById('overheatingTemp').style.color = 'green';
      }
      if (overheatingTemp <= 12 || overheatingTemp >= 30) {
        document.getElementById('overheatingTemp').style.color = 'red';
      }
    }
  }
};

export const calculation = (refrigerant, pressure, resistance) => {
  switch (refrigerant) {
    case 'R404a': {
      const A = 4.02423;
      const B = 786.645;
      const C = -30.093;

      const psi = pressure;
      const ohms = resistance;

      const P = psi / 14.504 + 1.04; //converting psi to bar

      const T = B / (A - Math.log10(P)) - C; //main operation

      const saturationTemp = parseFloat((T - 273.15).toFixed(2)); //converting kelvin to celsius
      const tubeTemp = parseFloat(((ohms - 1000) / 3.9).toFixed(2));
      const overheatTemp = parseFloat(
        // eslint-disable-next-line comma-dangle
        (parseFloat(tubeTemp) - parseFloat(saturationTemp)).toFixed(2)
      );
      const data = { saturationTemp, tubeTemp, overheatTemp };
      return data;
    }
    case 'R22': {
      const A = 6.7577;
      const B = 740.39;
      const C = 231.86;

      const psi = pressure;
      const ohms = resistance;

      const P = psi * 51.715 + 760; //converting psi to mmHg

      const T = B / (A - Math.log10(P)) - C; //main operation

      const saturationTemp = parseFloat(T.toFixed(2));
      const tubeTemp = parseFloat(((ohms - 1000) / 3.9).toFixed(2));
      const overheatTemp = parseFloat(
        // eslint-disable-next-line comma-dangle
        (parseFloat(tubeTemp) - parseFloat(saturationTemp)).toFixed(2)
      );
      const data = { saturationTemp, tubeTemp, overheatTemp };
      return data;
    }
    default: {
      return 0;
    }
  }
};
