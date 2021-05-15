import moment from 'moment';
moment.locale('pt-br');


export const timestampToDate = (timestamp) => {
  const data = new Date(timestamp * 1000);
  return moment(data).format('DD/MM/YYYY, h:mm:ss a');
};

export const dateToDate = (timestamp) => {
  const data = new Date(timestamp);
  return moment(data).format('DD/MM/YYYY, h:mm:ss a');
};
export const distanceToKm = (km) => {
  return (km / 1000).toFixed(2);
};

export const distanceToKmToRitimo = (tempo, km) => {
  let retorno;
  try {
    // console.log(tempo, km)
    const minutos = Math.floor(tempo / 60);
    const segundos = ((tempo % 60))
    const tempoprova = minutos + '.' + Math.floor(segundos)
    let resto = '00'
    console.log('tempoprova 1', tempoprova)

    const pace = ((tempoprova / (km / 1000)))
    console.log('decPart 1', decPart)
    let decPart = (pace + '').split(".");

    console.log('calculo mod 1', pace, decPart)
    console.log('calculo mod 1', decPart.length)

    if (decPart.length > 1) {
      decPart[1] = '0.' + decPart[1]
      resto = Math.floor((decPart[1] * 60))
      resto = zeroPad(resto, 2); // "05"
      console.log('tempoprova Ok ', resto)
    }
    retorno = decPart[0] + ':' + resto;

    console.log('resto retorno', retorno)

  } catch (error) {
    console.error(error)
    retorno = 0;
  } finally {
    return retorno;
  }
}




export const secondsToMinute = (tempo) => {
  let retorno = 0;
  try {
    retorno = Math.floor(tempo / 60);
    let resto = (tempo % 60);
    if (resto > 60) {
      resto = resto / 60;
    }


    retorno = { minutos: retorno, segundos: resto };

  } catch (error) {
    retorno = { minutos: retorno, segundos: resto };
  } finally {
    return retorno;
  }
}

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
