/* eslint-disable comma-dangle */
export const validatePercentage = (percentage) => {
  //checking evaporator percentage
  if (percentage <= 50) {
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
  if (retorno > injection) {
    if (
      unit === 'Conservación 1' ||
      unit === 'Conservación 2'
    ) {
      if (retorno > 10 && retorno < 3) {
        return false;
      }
    }
    if (unit === 'Cerveza') {
      if (retorno > 8 && retorno < 0) {
        return false;
      }
    }
    if (unit === 'Hielo') {
      if (retorno > 0 && retorno < -12) {
        return false;
      }
    }
    if (unit === 'Clima 1' || unit === 'Clima 2') {
      if (retorno < 22 && retorno > 26) {
        return false;
      }
    }
    if (!(retorno2 === 0 && injection2 === 0)) {
      //retorno 2 y injection 2 estan disponibles, es decir, los campos se estan rellenando
      if (retorno2 <= injection2) {
        return false;
      }
      if (retorno2 > 10.1) {
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

export const validateGeneralData = (retorno, retorno2) => {
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

  const diferenceBetweenRetornos = () => {
    if (!(retorno2 === '0')) {
      const retornosTolerance = Math.abs(
        parseFloat(retorno) - parseFloat(retorno2)
      );
      // console.log('retornosTolerance', retornosTolerance);
      if (retornosTolerance > 2) {
        return false;
      }
      return true;
    }
    return true;
  };

  if (
    porcentajeEvaporador === 'rgb(136, 252, 136)' &&
    ciclosEvaporador === 'rgb(136, 252, 136)' &&
    porcentajeCondensador === 'rgb(136, 252, 136)' &&
    ciclosCondensador === 'rgb(136, 252, 136)' &&
    porcentajeCheck === 'rgb(136, 252, 136)' &&
    ciclosCheck === 'rgb(136, 252, 136)' &&
    delta === 'rgb(136, 252, 136)' &&
    diferenceBetweenRetornos()
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
  return null;
};
