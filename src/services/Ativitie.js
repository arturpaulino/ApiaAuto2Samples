/* eslint-disable semi */
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { timestampToDate } from './helpers/tools';

import { API_ENDPOINT, RESOURCES, STRAVAKEY } from './constants/rest';
import api from './helpers/api';
import { getAuthorize } from '../services/token';

export const getListAtivities = async (code) => {
  const dataAuto = await getAuthorize()
  const after = new Date(2021, 3, 6).getTime() / 1000;
  let data;
  //console.log(after)
  api.defaults.headers.authorization = `Bearer ${dataAuto.auth.access_token}`;
  await api
    .get(RESOURCES.ACTIVITIES, {
      params: {
        after: after
      }
    }
    ).then((response) => {
      data = response.data;
    }
    ).catch((err) => {
      alert("Falta autorização no APP")
      console.log(err.data);
      console.log(err.status);
      console.log(err.statusText);
      console.log(err.headers);
      console.log(err.config);
      console.log(err.data)
      console.error("ops! ocorreu um erro" + err);
    })
  console.log(data);

  return data
}
