import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  CREATE_COMMENT: 'CREATE_COMMENT',
};

function createCommentActionCreator({ threadId, comment }) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: { threadId, comment },
  };
}

// fungsi thunk
function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ threadId, content });

      dispatch(createCommentActionCreator({ threadId, comment }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  createCommentActionCreator,
  asyncCreateComment,
};
