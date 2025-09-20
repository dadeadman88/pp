import 'react-native-reanimated'; // 👈 Must be first
import 'react-native-gesture-handler';
import React from 'react';
import MainNavigation from './navigation/MainNavigation';
import {Provider} from 'react-redux';
import store from './store';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { BASEURL } from './constants';
import { errorHandler } from './utils/utils';

axios.defaults.baseURL = BASEURL;
axios.interceptors.response.use((response) => response, errorHandler);

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
      <Toast />
    </Provider>
  );
};

export default App;
