import React from 'react';
import {Dimensions} from 'react-native';
import store from '../store';
import {removeItem} from './localStorage';
import moment from 'moment';

import {
  disableLoader,
  enableLoader,
  updateAppStates,
} from '../store/actions/AppActions';
import {MAP_KEY} from '../constants';
import Toast from 'react-native-toast-message';
const {width, height} = Dimensions.get('window');

export const getPlaces = (q: string) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${MAP_KEY}&input=${q}&types=geocode`,
      {
        method: 'post',
      },
    )
      .then(res => res.json())
      .then(res => {
        // console.log('getPlaces', res);
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

export const getGeocode = (lat: string, lng: string) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${MAP_KEY}`,
      {
        method: 'post',
      },
    )
      .then(res => res.json())
      .then(res => {
        // console.log('getGeocode', res);
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

export const getPlaceDetail = (place_id: string) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${MAP_KEY}&placeid=${place_id}&types=geocode`,
      {
        method: 'post',
      },
    )
      .then(res => res.json())
      .then(res => {
        // console.log('getPlaceDetail', res);
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

export const serialize = (obj: any | {}) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const formatUserType = (str: any) => {
  return str.replace('_', ' ');
};

export const datetimeFormat = (str: string, utc = false) => {
  let date: any = moment(str, 'YYYY-MM-DD hh:mm:ss');
  if (utc) date = moment.utc(str).local();
  return date.format('lll');
};

export const timeSince = (date: any) => {
  return moment(moment(date).utc()).local().fromNow();
};

export function getCurrentWeek(date: string) {
  var currentDate = moment(date);
  var weekStart = currentDate.clone().startOf('isoWeek');
  var weekEnd = currentDate.clone().endOf('isoWeek');
  return [weekStart.format('YYYY-MM-DD'), weekEnd.format('YYYY-MM-DD')];
}

export function formUrlEncode(payload: {}) {
  let formBody: any = [];
  for (var property in payload) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(payload[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');
}

interface CardProps {
  card_holder: string;
  card_number: string;
  expiry_date: string;
  cvv: Number;
}

export function getCardToken(data: CardProps) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${SRTIPE_PK}`);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const expiry = data.expiry_date.split('/');
  const details: any = {
    'card[name]': data.card_holder,
    'card[number]': data.card_number.replace(' ', ''),
    'card[exp_month]': expiry[0],
    'card[exp_year]': expiry[1],
    'card[cvc]': data.cvv,
  };

  var requestOptions: any = {
    method: 'POST',
    headers: myHeaders,
    body: formUrlEncode(details),
  };

  store.dispatch(enableLoader());
  return fetch(`https://api.stripe.com/v1/tokens`, requestOptions)
    .then(response => response.json())
    .then(result => {
      store.dispatch(disableLoader());
      return result.id;
    })
    .catch(err => errorHandler(err));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function errorHandler(error: any) {
  // console.log(error?.response?.status, error?.response?.data);
  let message = 'Something wents wrong';
  store.dispatch(disableLoader());
  switch (error.response?.status) {
    case 401:
      removeItem('@user');
      message = error.response?.data.error?.messages[0]
      store.dispatch(
        updateAppStates({
          user: {},
          token: null,
          splash: false,
          role: null,
          autorize: false,
        }),
      );
      break;

    case 422:
      console.log(message = error.response?.data.error?.messages);
      if(error.response?.data?.error?.message){
        message = error.response?.data.error?.message
      }else{
        message = error.response?.data.error?.messages[0]
      }
      break;

    default:
      message = error.response?.data?.error?.messages[0]
      throw error;
      break;
  }

  Toast.show({
    type: 'error',
    text1: message,
  });
}
