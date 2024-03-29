export const validateStartPressure = (e, refrigerant, unit) => {
  switch (refrigerant) {
    case 'R22': {
      switch (unit) {
        case 'Conservación 1':
        case 'Conservación 2':
        case 'Cerveza': {
          if (e.target.value >= 54 && e.target.value <= 66) {
            document.querySelector('#startPressure').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#startPressure').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case 'Hielo': {
          if (e.target.value >= 31.5 && e.target.value <= 38.5) {
            document.querySelector('#startPressure').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#startPressure').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
            break;
          }
        }
      }
      break;
    }
    case 'R404a': {
      switch (unit) {
        case 'Conservación 1':
        case 'Conservación 2':
        case 'Cerveza': {
          if (e.target.value >= 63 && e.target.value <= 77) {
            document.querySelector('#startPressure').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#startPressure').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case 'Hielo': {
          if (e.target.value >= 30.6 && e.target.value <= 37.4) {
            document.querySelector('#startPressure').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#startPressure').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
            break;
          }
        }
      }
    }
  }
};

export const validateStopPressure = (e, refrigerant, unit) => {
  switch (refrigerant) {
    case 'R22': {
      switch (unit) {
        case 'Conservación 1':
        case 'Conservación 2':
        case 'Cerveza': {
          if (e.target.value >= 27 && e.target.value <= 33) {
            document.querySelector('#stopPressure').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#stopPressure').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case 'Hielo': {
          if (e.target.value >= 9 && e.target.value <= 11) {
            document.querySelector('#stopPressure').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#stopPressure').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
            break;
          }
        }
      }
      break;
    }
    case 'R404a': {
      switch (unit) {
        case 'Conservación 1':
        case 'Conservación 2':
        case 'Cerveza': {
          if (e.target.value >= 36 && e.target.value <= 44) {
            document.querySelector('#stopPressure').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#stopPressure').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case 'Hielo': {
          if (e.target.value >= 15.3 && e.target.value <= 18.7) {
            document.querySelector('#stopPressure').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#stopPressure').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
            break;
          }
        }
      }
    }
  }
};

export const validateSuctionPressure = (e, refrigerant, unit) => {
  switch (refrigerant) {
    case 'R22': {
      switch (unit) {
        case 'Conservación 1':
        case 'Conservación 2':
        case 'Cerveza': {
          if (e.target.value >= 45 && e.target.value <= 57) {
            document.querySelector('#presion_succion').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#presion_succion').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case 'Hielo': {
          if (e.target.value >= 23 && e.target.value <= 29) {
            document.querySelector('#presion_succion').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#presion_succion').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
            break;
          }
        }
      }
      break;
    }
    case 'R404a': {
      switch (unit) {
        case 'Conservación 1':
        case 'Conservación 2':
        case 'Cerveza': {
          if (e.target.value >= 55 && e.target.value <= 65) {
            document.querySelector('#presion_succion').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#presion_succion').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case 'Hielo': {
          if (e.target.value >= 30 && e.target.value <= 38) {
            document.querySelector('#presion_succion').style.backgroundColor =
              '#88fc88'; //green
            // console.log('APROVADO');
          } else {
            document.querySelector('#presion_succion').style.backgroundColor =
              '#fa6b6b'; //red
            // console.log('RECHAZADO');
            break;
          }
        }
      }
    }
  }
};

export const validateOverheatingTemperature = (overheatingTemp, unit) => {
  switch (unit) {
    case 'Conservación 1':
    case 'Conservación 2':
    case 'Cerveza': {
      if (overheatingTemp >= 12 && overheatingTemp <= 17) {
        document.getElementById('overheatingTemp').style.color = 'green';
      }
      if (overheatingTemp < 12 || overheatingTemp > 17) {
        document.getElementById('overheatingTemp').style.color = 'red';
      }
      break;
    }
    case 'Hielo': {
      if (overheatingTemp >= 12 && overheatingTemp <= 30) {
        document.getElementById('overheatingTemp').style.color = 'green';
      }
      if (overheatingTemp < 12 || overheatingTemp > 30) {
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

export const parseUnit = (unit, unitNumber) => {
  switch (unit) {
    case 'Conservacion':
      return `Conservación ${unitNumber}`;
    case 'Hielo':
      return 'Hielo';
    case 'Cerveza':
      return 'Cerveza';
  }
};
