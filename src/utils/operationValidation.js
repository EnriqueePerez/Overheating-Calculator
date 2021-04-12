/* eslint-disable comma-dangle */
// export const validateStartPressure = (e, refrigerant, unit) => {
//   switch (refrigerant) {
//     case 'R22': {
//       switch (unit) {
//         case 'Conservacion':
//         case 'Cerveza': {
//           if (e.target.value >= 54 && e.target.value <= 66) {
//             document.querySelector('#startPressure').style.backgroundColor =
//               '#88fc88'; //green
//             // console.log('APROVADO');
//           } else {
//             document.querySelector('#startPressure').style.backgroundColor =
//               '#fa6b6b'; //red
//             // console.log('RECHAZADO');
//           }
//           break;
//         }
//         case 'Hielo': {
//           if (e.target.value >= 31.5 && e.target.value <= 38.5) {
//             document.querySelector('#startPressure').style.backgroundColor =
//               '#88fc88'; //green
//             // console.log('APROVADO');
//           } else {
//             document.querySelector('#startPressure').style.backgroundColor =
//               '#fa6b6b'; //red
//             // console.log('RECHAZADO');
//             break;
//           }
//         }
//       }
//       break;
//     }
//     case 'R404a': {
//       switch (unit) {
//         case 'Conservacion':
//         case 'Cerveza': {
//           if (e.target.value >= 63 && e.target.value <= 77) {
//             document.querySelector('#startPressure').style.backgroundColor =
//               '#88fc88'; //green
//             // console.log('APROVADO');
//           } else {
//             document.querySelector('#startPressure').style.backgroundColor =
//               '#fa6b6b'; //red
//             // console.log('RECHAZADO');
//           }
//           break;
//         }
//         case 'Hielo': {
//           if (e.target.value >= 30.6 && e.target.value <= 37.4) {
//             document.querySelector('#startPressure').style.backgroundColor =
//               '#88fc88'; //green
//             // console.log('APROVADO');
//           } else {
//             document.querySelector('#startPressure').style.backgroundColor =
//               '#fa6b6b'; //red
//             // console.log('RECHAZADO');
//             break;
//           }
//         }
//       }
//     }
//   }
// };

// export const validateStopPressure = (e, refrigerant, unit) => {
//   switch (refrigerant) {
//     case 'R22': {
//       switch (unit) {
//         case 'Conservacion':
//         case 'Cerveza': {
//           if (e.target.value >= 27 && e.target.value <= 33) {
//             document.querySelector('#stopPressure').style.backgroundColor =
//               '#88fc88'; //green
//             // console.log('APROVADO');
//           } else {
//             document.querySelector('#stopPressure').style.backgroundColor =
//               '#fa6b6b'; //red
//             // console.log('RECHAZADO');
//           }
//           break;
//         }
//         case 'Hielo': {
//           if (e.target.value >= 9 && e.target.value <= 11) {
//             document.querySelector('#stopPressure').style.backgroundColor =
//               '#88fc88'; //green
//             // console.log('APROVADO');
//           } else {
//             document.querySelector('#stopPressure').style.backgroundColor =
//               '#fa6b6b'; //red
//             // console.log('RECHAZADO');
//             break;
//           }
//         }
//       }
//       break;
//     }
//     case 'R404a': {
//       switch (unit) {
//         case 'Conservacion':
//         case 'Cerveza': {
//           if (e.target.value >= 36 && e.target.value <= 44) {
//             document.querySelector('#stopPressure').style.backgroundColor =
//               '#88fc88'; //green
//             // console.log('APROVADO');
//           } else {
//             document.querySelector('#stopPressure').style.backgroundColor =
//               '#fa6b6b'; //red
//             // console.log('RECHAZADO');
//           }
//           break;
//         }
//         case 'Hielo': {
//           if (e.target.value >= 15.3 && e.target.value <= 18.7) {
//             document.querySelector('#stopPressure').style.backgroundColor =
//               '#88fc88'; //green
//             // console.log('APROVADO');
//           } else {
//             document.querySelector('#stopPressure').style.backgroundColor =
//               '#fa6b6b'; //red
//             // console.log('RECHAZADO');
//             break;
//           }
//         }
//       }
//     }
//   }
// };

// export const validateOverheatingTemperature = (overheatingTemp, unit) => {
//   switch (unit) {
//     case 'Conservacion':
//     case 'Cerveza': {
//       if (overheatingTemp > 12 && overheatingTemp < 17) {
//         document.getElementById('overheatingTemp').style.color = 'green';
//       }
//       if (overheatingTemp <= 12 || overheatingTemp >= 17) {
//         document.getElementById('overheatingTemp').style.color = 'red';
//       }
//       break;
//     }
//     case 'Hielo': {
//       if (overheatingTemp > 12 && overheatingTemp < 30) {
//         document.getElementById('overheatingTemp').style.color = 'green';
//       }
//       if (overheatingTemp <= 12 || overheatingTemp >= 30) {
//         document.getElementById('overheatingTemp').style.color = 'red';
//       }
//     }
//   }
// };

// export const calculation = (refrigerant, pressure, resistance) => {
//   switch (refrigerant) {
//     case 'R404a': {
//       const A = 4.02423;
//       const B = 786.645;
//       const C = -30.093;

//       const psi = pressure;
//       const ohms = resistance;

//       const P = psi / 14.504 + 1.04; //converting psi to bar

//       const T = B / (A - Math.log10(P)) - C; //main operation

//       const saturationTemp = parseFloat((T - 273.15).toFixed(2)); //converting kelvin to celsius
//       const tubeTemp = parseFloat(((ohms - 1000) / 3.9).toFixed(2));
//       const overheatTemp = parseFloat(
//         // eslint-disable-next-line comma-dangle
//         (parseFloat(tubeTemp) - parseFloat(saturationTemp)).toFixed(2)
//       );
//       const data = { saturationTemp, tubeTemp, overheatTemp };
//       return data;
//     }
//     case 'R22': {
//       const A = 6.7577;
//       const B = 740.39;
//       const C = 231.86;

//       const psi = pressure;
//       const ohms = resistance;

//       const P = psi * 51.715 + 760; //converting psi to mmHg

//       const T = B / (A - Math.log10(P)) - C; //main operation

//       const saturationTemp = parseFloat(T.toFixed(2));
//       const tubeTemp = parseFloat(((ohms - 1000) / 3.9).toFixed(2));
//       const overheatTemp = parseFloat(
//         // eslint-disable-next-line comma-dangle
//         (parseFloat(tubeTemp) - parseFloat(saturationTemp)).toFixed(2)
//       );
//       const data = { saturationTemp, tubeTemp, overheatTemp };
//       return data;
//     }
//     default: {
//       return 0;
//     }
//   }
// };

export const validatePercentage = (percentage) => {
  //checking evaporator percentage
  if (percentage < 50) {
    return true;
  }
  return false;
};

export const validateCycles = (cycles) => {
  //checking evaporator percentage
  if (cycles < 110) {
    return true;
  }
  return false;
};

export const calculateDeltaAndTolerances = (
  retornoOriginal,
  injectionOriginal,
  retorno2Original,
  injection2Original,
  evaporatorPercentage,
  condenserPercentage,
  evaporatorCycles,
  condenserCycles,
  unit
) => {
  const retorno = parseFloat(retornoOriginal);
  const injection = parseFloat(injectionOriginal);
  const retorno2 = parseFloat(retorno2Original);
  const injection2 = parseFloat(injection2Original);
  if (retorno > injection && retorno < 26) {
    if (
      unit === 'Conservación 1' ||
      unit === 'Conservación 2' ||
      unit === 'Cerveza'
    ) {
      if (retorno > 10.1) {
        return false;
      }
    }
    if (unit === 'Hielo') {
      console.log('entre a hielo', unit, retorno);
      if (retorno > -0.1) {
        return false;
      }
    }
    // console.log(retorno);
    // console.log(injection);
    // console.log(retorno2);
    // console.log(injection2);
    if (!(retorno2 === 0 && injection2 === 0)) {
      //retorno 2 y injection 2 estan disponibles, es decir, los campos se estan rellenando
      if (retorno2 <= injection2) {
        return false;
      }
    }
    const averageDeltas = () => {
      if (!(retorno2 === 0 && injection2 === 0)) {
        //retorno 2 y injection 2 estan disponibles, es decir, los campos se estan rellenando
        // console.log('entre');
        const delta1 = retorno - injection;
        const delta2 = retorno2 - injection2;
        const deltaAverages = ((delta1 + delta2) / 2).toFixed(2);
        return deltaAverages; //delta average
      }
      const delta = (retorno - injection).toFixed(2);
      return delta;
    };

    const percentageTolerance = Math.abs(
      evaporatorPercentage - condenserPercentage
    );

    const cycleTolerance = Math.abs(evaporatorCycles - condenserCycles);

    const percentageValue = () => {
      const porcentajeEvaporador = document.getElementById(
        'evaporatorPercentage'
      ).style.backgroundColor;
      const porcentajeCondensador = document.getElementById(
        'condenserPercentage'
      ).style.backgroundColor;
      if (
        percentageTolerance <= 1 &&
        porcentajeEvaporador === 'rgb(136, 252, 136)' &&
        porcentajeCondensador === 'rgb(136, 252, 136)'
      ) {
        return 'Aprobado';
      }
      return 'No aprobado';
    };

    const cycleValue = () => {
      const ciclosEvaporador = document.getElementById('evaporatorCycles').style
        .backgroundColor;
      const ciclosCondensador = document.getElementById('condenserCycles').style
        .backgroundColor;
      if (
        cycleTolerance <= 2 &&
        ciclosEvaporador === 'rgb(136, 252, 136)' &&
        ciclosCondensador === 'rgb(136, 252, 136)'
      ) {
        return 'Aprobado';
      }
      return 'No aprobado';
    };

    const delta = averageDeltas();
    // console.log(retorno);
    // console.log(injection);

    const caculatedValues = { percentageValue, cycleValue, delta };

    return caculatedValues;
  }
  return false;
};

export const validateGeneralData = () => {
  const porcentajeEvaporador = document.getElementById('evaporatorPercentage')
    .style.backgroundColor;
  const ciclosEvaporador = document.getElementById('evaporatorCycles').style
    .backgroundColor;
  const porcentajeCondensador = document.getElementById('condenserPercentage')
    .style.backgroundColor;
  const ciclosCondensador = document.getElementById('condenserCycles').style
    .backgroundColor;
  const porcentajeCheck = document.getElementById('percentageCheck').style
    .color;
  const ciclosCheck = document.getElementById('cycleCheck').style.color;
  const delta = document.getElementById('delta').style.color;

  if (
    porcentajeEvaporador === 'rgb(136, 252, 136)' &&
    ciclosEvaporador === 'rgb(136, 252, 136)' &&
    porcentajeCondensador === 'rgb(136, 252, 136)' &&
    ciclosCondensador === 'rgb(136, 252, 136)' &&
    porcentajeCheck === 'rgb(136, 252, 136)' &&
    ciclosCheck === 'rgb(136, 252, 136)' &&
    delta === 'rgb(136, 252, 136)'
  ) {
    // console.log('aprobado');
    return true;
  }
  // console.log('no aprobado');
  return false;
  // console.log(delta);
};

export const parseUnit = (unit, unitNumber) => {
  switch (unit) {
    case 'Conservacion':
      return `Conservación ${unitNumber}`;
    case 'Hielo':
      return 'Hielo';
    case 'Cerveza':
      return 'Cerveza';
    case 'Clima':
      return `Clima ${unitNumber}`;
  }
};
