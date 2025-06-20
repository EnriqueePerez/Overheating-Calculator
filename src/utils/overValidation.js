export const validateStartPressure = (e, refrigerant, unit) => {
  switch (refrigerant) {
    case "R22": {
      switch (unit) {
        case "Conservación 1":
        case "Conservación 2":
        case "Cerveza": {
          if (e.target.value >= 54 && e.target.value <= 66) {
            document.querySelector("#startPressure").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#startPressure").style.backgroundColor =
              "#fa6b6b"; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case "Hielo": {
          if (e.target.value >= 31.5 && e.target.value <= 38.5) {
            document.querySelector("#startPressure").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#startPressure").style.backgroundColor =
              "#fa6b6b"; //red
            // console.log('RECHAZADO');
            break;
          }
        }
      }
      break;
    }
    case "R449a":
    case "R404a": {
      switch (unit) {
        case "Conservación 1":
        case "Conservación 2":
        case "Cerveza": {
          if (e.target.value >= 63 && e.target.value <= 77) {
            document.querySelector("#startPressure").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#startPressure").style.backgroundColor =
              "#fa6b6b"; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case "Hielo": {
          if (e.target.value >= 30.6 && e.target.value <= 37.4) {
            document.querySelector("#startPressure").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#startPressure").style.backgroundColor =
              "#fa6b6b"; //red
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
    case "R22": {
      switch (unit) {
        case "Conservación 1":
        case "Conservación 2":
        case "Cerveza": {
          if (e.target.value >= 27 && e.target.value <= 33) {
            document.querySelector("#stopPressure").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#stopPressure").style.backgroundColor =
              "#fa6b6b"; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case "Hielo": {
          if (e.target.value >= 9 && e.target.value <= 11) {
            document.querySelector("#stopPressure").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#stopPressure").style.backgroundColor =
              "#fa6b6b"; //red
            // console.log('RECHAZADO');
            break;
          }
        }
      }
      break;
    }
    case "R449a":
    case "R404a": {
      switch (unit) {
        case "Conservación 1":
        case "Conservación 2":
        case "Cerveza": {
          if (e.target.value >= 36 && e.target.value <= 44) {
            document.querySelector("#stopPressure").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#stopPressure").style.backgroundColor =
              "#fa6b6b"; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case "Hielo": {
          if (e.target.value >= 15.3 && e.target.value <= 18.7) {
            document.querySelector("#stopPressure").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#stopPressure").style.backgroundColor =
              "#fa6b6b"; //red
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
    case "R22": {
      switch (unit) {
        case "Conservación 1":
        case "Conservación 2":
        case "Cerveza": {
          if (e.target.value >= 45 && e.target.value <= 57) {
            document.querySelector("#presion_succion").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#presion_succion").style.backgroundColor =
              "#fa6b6b"; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case "Hielo": {
          if (e.target.value >= 23 && e.target.value <= 29) {
            document.querySelector("#presion_succion").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#presion_succion").style.backgroundColor =
              "#fa6b6b"; //red
            // console.log('RECHAZADO');
            break;
          }
        }
      }
      break;
    }
    case "R449a":
    case "R404a": {
      switch (unit) {
        case "Conservación 1":
        case "Conservación 2":
        case "Cerveza": {
          if (e.target.value >= 55 && e.target.value <= 65) {
            document.querySelector("#presion_succion").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#presion_succion").style.backgroundColor =
              "#fa6b6b"; //red
            // console.log('RECHAZADO');
          }
          break;
        }
        case "Hielo": {
          if (e.target.value >= 30 && e.target.value <= 38) {
            document.querySelector("#presion_succion").style.backgroundColor =
              "#88fc88"; //green
            // console.log('APROVADO');
          } else {
            document.querySelector("#presion_succion").style.backgroundColor =
              "#fa6b6b"; //red
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
    case "Conservación 1":
    case "Conservación 2":
    case "Cerveza": {
      if (overheatingTemp >= 12 && overheatingTemp <= 17) {
        document.getElementById("overheatingTemp").style.color = "green";
      }
      if (overheatingTemp < 12 || overheatingTemp > 17) {
        document.getElementById("overheatingTemp").style.color = "red";
      }
      break;
    }
    case "Hielo": {
      if (overheatingTemp >= 12 && overheatingTemp <= 30) {
        document.getElementById("overheatingTemp").style.color = "green";
      }
      if (overheatingTemp < 12 || overheatingTemp > 30) {
        document.getElementById("overheatingTemp").style.color = "red";
      }
    }
  }
};

export const calculation = (refrigerant, pressure, resistance) => {
  //To know all the formulas and constants, check the dad_files folder
  //Results are in celsius
  //Pressure is in absolute pressure (bar)
  //Resistance is in ohms

  let A, B, C;
  // Constants are fetch from Danfoss table, info is on dad_files
  switch (refrigerant) {
    // Dew constants
    case "R22": {
      A = 9.748;
      B = -2017.2;
      C = 247.8;
      break;
    }
    // Dew constants, glide for 404a is 0.5 (to get bubble result, sustract glide from saturation temp)
    case "R404a": {
      A = 9.715;
      B = -1946.4;
      C = 245.8;
      break;
    }
    // Dew constants, glide for 449a is 5.0 (to get bubble result, sustract glide from saturation temp)
    case "R449a": {
      A = 9.975;
      B = -2019.7;
      C = 242.4;
      break;
    }
  }

  const psiGauge = pressure; //psi gauge
  const ohms = resistance; //ohms

  const pBarAbs = psiGauge / 14.504 + 1.04; //converting psi to bar(absolute)
  const tCelsius = B / (Math.log(pBarAbs) - A) - C; //main operation

  //Results are in celsius
  const saturationTemp = parseFloat(tCelsius.toFixed(2));
  const tubeTemp = parseFloat(((ohms - 1000) / 3.9).toFixed(2));
  const superheatTemp = parseFloat(
    (parseFloat(tubeTemp) - parseFloat(saturationTemp)).toFixed(2)
  );

  return { saturationTemp, tubeTemp, overheatTemp: superheatTemp };
};

export const parseUnit = (unit, unitNumber) => {
  switch (unit) {
    case "Conservacion":
      return `Conservación ${unitNumber}`;
    case "Hielo":
      return "Hielo";
    case "Cerveza":
      return "Cerveza";
  }
};
