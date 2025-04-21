import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;

  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];

  case ActionType.VOTE_THREAD: {
    const { threadId, userId, voteType } = action.payload;
    return threads.map((thread) => {
      if (thread.id !== threadId) return thread;

      const hasUp = thread.upVotesBy.includes(userId);
      const hasDown = thread.downVotesBy.includes(userId);

      const upVotes = thread.upVotesBy.filter((id) => id !== userId);
      const downVotes = thread.downVotesBy.filter((id) => id !== userId);

      //filter dulu, baru push
      if (voteType === 1 && !hasUp) {
        upVotes.push(userId);
      } else if (voteType === -1 && !hasDown) {
        downVotes.push(userId);
      }

      return { ...thread, upVotesBy: upVotes, downVotesBy: downVotes };
    });
  }

  default:
    return threads;
  }
}

export default threadsReducer;
