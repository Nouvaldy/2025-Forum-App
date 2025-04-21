import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const ActionType = {
  FETCH_LEADERBOARDS_REQUEST: 'FETCH_LEADERBOARDS_REQUEST',
  FETCH_LEADERBOARDS_SUCCESS: 'FETCH_LEADERBOARDS_SUCCESS',
  FETCH_LEADERBOARDS_FAILURE: 'FETCH_LEADERBOARDS_FAILURE',
};

function fetchLeaderboardsRequest() {
  return {
    type: ActionType.FETCH_LEADERBOARDS_REQUEST,
  };
}

function fetchLeaderboardsSuccess(leaderboards) {
  return {
    type: ActionType.FETCH_LEADERBOARDS_SUCCESS,
    payload: {
      leaderboards,
    },
  };
}

function fetchLeaderboardsFailure(error) {
  return {
    type: ActionType.FETCH_LEADERBOARDS_FAILURE,
    payload: {
      error,
    },
  };
}

// thunk function
function asyncFetchLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(fetchLeaderboardsRequest());

    try {
      const response = await api.getLeaderboards();
      const leaderboards = response.data.leaderboards;
      dispatch(fetchLeaderboardsSuccess(leaderboards));
    } catch (error) {
      dispatch(fetchLeaderboardsFailure(error.message));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  fetchLeaderboardsRequest,
  fetchLeaderboardsSuccess,
  fetchLeaderboardsFailure,
  asyncFetchLeaderboards,
};
