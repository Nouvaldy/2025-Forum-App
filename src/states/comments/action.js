import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  CREATE_COMMENT_REQUEST: 'CREATE_COMMENT_REQUEST',
  CREATE_COMMENT_SUCCESS: 'CREATE_COMMENT_SUCCESS',
};

function createCommentRequestActionCreator({ threadId, content }) {
  return {
    type: ActionType.CREATE_COMMENT_REQUEST,
    payload: { threadId, content },
  };
}

function createCommentSuccessActionCreator({ threadId, comment }) {
  return {
    type: ActionType.CREATE_COMMENT_SUCCESS,
    payload: { threadId, comment },
  };
}

// fungsi thunk
function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(createCommentRequestActionCreator({ threadId, content }));

    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(createCommentSuccessActionCreator({ threadId, comment }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  createCommentRequestActionCreator,
  createCommentSuccessActionCreator,
  asyncCreateComment,
};
