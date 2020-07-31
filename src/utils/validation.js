export const validateCutPressureR404 = (e) => {
  if (e.target.value >= 63 && e.target.value <= 77) {
    document.querySelector('#cutPressure').style.backgroundColor = '#88fc88'; //green
    // console.log('APROVADO');
    return true;
  }
  document.querySelector('#cutPressure').style.backgroundColor = '#fa6b6b'; //red
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

export const validateOverheatingTemperature = (e) => {
  if (e.target.value >= 12 && e.target.value <= 17) {
    document.querySelector('#overheatingTemp').style.backgroundColor =
      '#88fc88'; //green
    // console.log('APROVADO');
    return true;
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

      const saturationTemp = (T - 273.15).toFixed(2); //converting kelvin to celsius
      const tubeTemp = ((ohms - 1000) / 3.9).toFixed(2);
      const overheatTemp = (
        parseFloat(tubeTemp) - parseFloat(saturationTemp)
      ).toFixed(2);
      const data = { saturationTemp, tubeTemp, overheatTemp };
      return data;
    }
    case 'R22': {
      const A = 6.7577;
      const B = 740.39;
      const C = 231.86;
    }
  }
};
