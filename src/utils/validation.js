export const validateCutPressureR404 = (e) => {
  if (e.target.value >= 54 && e.target.value <= 66) {
    document.querySelector('#cutPressure').style.backgroundColor = '#88fc88';
    console.log('APROVADO');
    return true;
  }
  document.querySelector('#cutPressure').style.backgroundColor = '#fa6b6b';
  console.log('RECHAZADO');
  return false;
};

export const validateStopPressureR404 = (e) => {
  if (e.target.value >= 27 && e.target.value <= 33) {
    document.querySelector('#stopPressure').style.backgroundColor = '#88fc88';
    console.log('APROVADO');
    return true;
  }
  document.querySelector('#stopPressure').style.backgroundColor = '#fa6b6b';
  console.log('RECHAZADO');
  return false;
};
