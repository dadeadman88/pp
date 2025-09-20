import { UPDATE_FEED_STATE } from "../actions/FeedActions";

const initialState = {
  feeds: {
    data: [],
    pagination: {}
  }
};

export default FeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FEED_STATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
