import { ActionType } from './action';

const initialState = {
  items: [],      // array of { user, score }
  loading: false,
  error: null,
};

function leaderboardsReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.FETCH_LEADERBOARDS_REQUEST:
    return {
      ...state,
      loading: true,
      error: null,
    };

  case ActionType.FETCH_LEADERBOARDS_SUCCESS:
    return {
      ...state,
      loading: false,
      items: action.payload.leaderboards,
    };

  case ActionType.FETCH_LEADERBOARDS_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    };

  default:
    return state;
  }
}

export default leaderboardsReducer;
