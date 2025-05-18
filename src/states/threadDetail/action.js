import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  VOTE_THREAD_DETAIL: 'VOTE_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function voteThreadDetailActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.VOTE_THREAD_DETAIL,
    payload: { threadId, userId, voteType },
  };
}

//fungsi thunk
function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncVoteThreadDetail({ threadId, commentId, voteType }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      voteThreadDetailActionCreator({
        threadId,
        userId: authUser.id,
        voteType,
      })
    ); //optimistik

    try {
      await api.voteComment({ threadId, commentId, voteType });
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
      dispatch(
        voteThreadDetailActionCreator({
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
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  voteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncVoteThreadDetail,
};
