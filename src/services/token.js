/* eslint-disable semi */
import { Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { API_ENDPOINT, RESOURCES, STRAVAKEY } from '../services/constants/rest';
import api from '../services/helpers/api';

export const isExpiredToken = async (timeOld) => {
  const currentTime = new Date().getTime() / 1000;
  console.log('isExpiredToken currentTime', currentTime);
  console.log('isExpiredToken timeOld', timeOld);
  if (currentTime > timeOld) {
    console.log('isExpiredToken YES');
    return false;
  } else {
    console.log('isExpiredToken NO ');
    return true;
  }
}

export const cleatAuthorize = async () => {
  await AsyncStorage.removeItem('authorize');
}


export const setAuthorize = async (data) => {
  await AsyncStorage.setItem('authorize', JSON.stringify(data));
}

export const isLogged = async () => {
  await refressAuthorize();
  console.log('isLogged', isLogged)

  const data = await AsyncStorage.getItem('authorize');
  console.log('isLogged', data !== null)
  return data !== null;
}

export const getAuthorize = async () => {
  const data = await AsyncStorage.getItem('authorize');
  let dataJSON;
  console.log('getAuthorize data', data)

  if (data !== undefined && data !== null) {
    dataJSON = JSON.parse(data);

  }
  console.log('getAuthorize', dataJSON)
  return dataJSON;
}

export const getAuthorizeToken = async () => {
  const data = await AsyncStorage.getItem('authorize');
  let dataJSON;
  console.log('getAuthorizeToken data', data)

  if (data !== undefined && data !== null) {
    dataJSON = JSON.parse(data);

  }
  console.log('getAuthorize', dataJSON)
  return dataJSON;
}


export const makeAuthorize = async () => {
  const url_Authorize = API_ENDPOINT + RESOURCES.AUTHORIZE + '?client_id=' + STRAVAKEY.IDCLIENT + '&response_type=code&redirect_uri=' + STRAVAKEY.REDIRECT_URI
  const supported = await Linking.canOpenURL(url_Authorize);
  if (supported) {
    await Linking.openURL(url_Authorize);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
}

export const refressAuthorize = async () => {
  const data = await getAuthorizeToken();
  if (data == null);
  return;

  console.log('refressAuthorize')
  if (!(lRefress)) {
    console.log('Rerefess sendo executado')
    await api.post(RESOURCES.OAUTH, {
      client_id: STRAVAKEY.IDCLIENT,
      client_secret: STRAVAKEY.SECRETCUSTOMER,
      grant_type: 'refresh_token',
      refresh_token: data.auth.refresh_token,
    })
      .then((response) => {
        console.log('refressAuthorize data', response.data);
        data.auth = {
          token_type: response.data.token_type,
          expires_at: response.data.expires_at,
          expires_in: response.data.expires_in,
          refresh_token: response.data.refresh_token,
          access_token: response.data.access_token,
        }
        setAuthorize(data)
      }).catch((err) => {
        console.log('refressAuthorize err', err.data);
        console.log(err.data);
        console.log(err.status);
        console.log(err.statusText);
        console.log(err.headers);
        console.log(err.config);
        console.log(err.data);
        console.error("ops! ocorreu um erro" + err);
      })
  }
}

export const setDeauthorization = async (code) => {
  const dataAuto = await getAuthorizeToken()
  console.log('setDeauthorization', dataAuto)
  api.defaults.headers.authorization = `Bearer ${dataAuto.auth.access_token}`;
  await api
    .post(RESOURCES.DEAUTHORIZE, {
      params: {
        access_token: dataAuto.auth.access_token
      }
    }).then((response) => {
      console.log(response.data)
      cleatAuthorize()
      alert("Autorização revogada")
    }
    ).catch((err) => {
      console.log(err.data);
      console.log(err.status);
      console.log(err.statusText);
      console.log(err.headers);
      console.log(err.config);
      // console.log(err.data)
      console.error("ops! ocorreu um erro" + err);
    })
  //  console.log(data);
  //return data
}



export const getOauth = async (code) => {
  let data = '';
  await api
    .post(RESOURCES.OAUTH, {
      client_id: STRAVAKEY.IDCLIENT,
      client_secret: STRAVAKEY.SECRETCUSTOMER,
      code: code,
      grant_type: 'authorization_code',
    }).then((response) => {
      data = {
        code: { code },
        auth: {
          token_type: response.data.token_type,
          expires_at: response.data.expires_at,
          expires_in: response.data.expires_in,
          refresh_token: response.data.refresh_token,
          access_token: response.data.access_token,
        },
        athlete: response.data.athlete,
      }
      setAuthorize(data)
    }
    ).catch((err) => {
      console.log(err.data);
      console.log(err.status);
      console.log(err.statusText);
      console.log(err.headers);
      console.log(err.config);
      console.log(err.data)
      console.error("ops! ocorreu um erro" + err);
    })
  //  console.log(data);
  return data
}
