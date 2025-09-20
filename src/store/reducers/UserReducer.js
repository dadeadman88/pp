import {RESET_USER_STATE, UPDATE_STATE} from '../actions/UserActions';

const initialState = {
  notifications: {
    data: [],
    pagination: {},
  },
  verification: {
    visible: false,
    url: null,
    type: null,
    data: {},
  },
  addresses: []
};

export default UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return {
        ...state,
        ...action.payload,
      };

    case RESET_USER_STATE:
      return {...initialState};

    default:
      return state;
  }
};
