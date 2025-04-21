import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL:   'CLEAR_THREAD_DETAIL',
  VOTE_THREAD_DETAIL:    'VOTE_THREAD_DETAIL',
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

// voteType: 1 = upvote, 0 = neutral, -1 = downvote
function voteThreadDetailActionCreator({ userId, voteType }) {
  return {
    type: ActionType.VOTE_THREAD_DETAIL,
    payload: { userId, voteType },
  };
}

// Thunk: fetch detail thread
function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const { data } = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(data.detailThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

// Thunk: vote (up, down, neutral) on detail thread
function asyncVoteThreadDetail({ threadId, voteType }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    // Optimistic update
    dispatch(voteThreadDetailActionCreator({
      userId: authUser.id,
      voteType,
    }));
    try {
      // API automatically determines endpoint by voteType
      if (voteType === 1) {
        await api.upVoteThread(threadId);
      } else if (voteType === -1) {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralizeThreadVote(threadId);
      }
    } catch (error) {
      alert(error.message);
      // Rollback
      dispatch(voteThreadDetailActionCreator({
        userId: authUser.id,
        voteType,
      }));
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
