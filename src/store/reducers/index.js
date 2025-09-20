import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import AppReducer from './AppReducer';
import FeedReducer from './FeedReducer';

export default combineReducers({
  AppReducer,
  UserReducer,
  FeedReducer
});
