import { ActionType } from './action';

// comments tersimpan di threadId: { [threadId]: [comment, ...] }
function commentsReducer(commentsByThread = {}, action = {}) {
  switch (action.type) {
  case ActionType.CREATE_COMMENT_SUCCESS: {
    const { threadId, comment } = action.payload;
    const existingComments = commentsByThread[threadId] || [];
    return {
      ...commentsByThread,
      [threadId]: [...existingComments, comment],
    };
  }

  default:
    return commentsByThread;
  }
}

export default commentsReducer;