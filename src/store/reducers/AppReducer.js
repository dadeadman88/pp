import axios from 'axios';
import {
  RESET_APP_STATE,
  UPDATE_APP_STATE,
  UPDATE_LOADER,
} from '../actions/AppActions';

const initialState = {
  splash: true,
  loader: false,
  defaultRoute: null,
  fcmToken: null,
  darkTheme: false,
  authorize: null,
  token: null,
  role: null,
  location: null,
  user: {
    image: null,
    first_name: 'Guest'
  },
  addresses: [],
  info: {},
  searchFilter: {
    categories: [],
    sortBy: '',
  },
};

export default AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOADER:
      return {
        ...state,
        loader: action.loader,
      };
    case UPDATE_APP_STATE:

      if(action.payload.token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
      }

      return {
        ...state,
        ...action.payload,
      };
      
    case RESET_APP_STATE:
      return {...initialState};

    default:
      return state;
  }
};
