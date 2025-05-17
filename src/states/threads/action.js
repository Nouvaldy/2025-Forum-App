import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  VOTE_THREAD: 'VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function voteThreadActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.VOTE_THREAD,
    payload: { threadId, userId, voteType },
  };
}

//fungsi thunk
function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({
        title,
        body,
        category,
      });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      voteThreadActionCreator({
        threadId,
        userId: authUser.id,
        voteType,
      })
    ); //optimistik

    try {
      await api.voteThread({ threadId, voteType });
    } catch (error) {
      alert(error.message);
      dispatch(
        voteThreadActionCreator({
          threadId,
          userId: authUser.id,
          voteType,
        })
      ); //optimistik
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  voteThreadActionCreator,
  asyncAddThread,
  asyncVoteThread,
};
