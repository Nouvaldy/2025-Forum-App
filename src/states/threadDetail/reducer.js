import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;

  case ActionType.CLEAR_THREAD_DETAIL:
    return null;

  case ActionType.VOTE_THREAD_DETAIL: {
    // if (!threadDetail) return threadDetail;

    const { userId, voteType } = action.payload;
    const hasUp = threadDetail.upVotesBy.includes(userId);
    const hasDown = threadDetail.downVotesBy.includes(userId);

    const upVotes = threadDetail.upVotesBy.filter((id) => id !== userId);
    const downVotes = threadDetail.downVotesBy.filter((id) => id !== userId);

    //filter dulu, baru push
    if (voteType === 1 && !hasUp) {
      upVotes.push(userId);
    } else if (voteType === -1 && !hasDown) {
      downVotes.push(userId);
    }

    return { ...threadDetail, upVotesBy: upVotes, downVotesBy: downVotes };
  }

  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
