import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Card } from '@mui/material';
import Typography from '@mui/material/Typography';

import { asyncCreateComment } from '../states/comments/action';
import {
  asyncReceiveThreadDetail,
  asyncVoteThreadDetail,
} from '../states/threadDetail/action';
import { asyncVoteThread } from '../states/threads/action';

import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentsList from '../components/CommentsList';
import NotFoundPage from './NotFoundPage';

export default function DetailPage() {
  const { threadId } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

  const onUpVoteThreadDetail = (id) => {
    dispatch(
      asyncVoteThread({
        threadId: id,
        voteType: 1,
      })
    ).then(() => {
      dispatch(asyncReceiveThreadDetail(id));
    });
  };

  const onDownVoteThreadDetail = (id) => {
    dispatch(
      asyncVoteThread({
        threadId: id,
        voteType: -1,
      })
    ).then(() => {
      dispatch(asyncReceiveThreadDetail(id));
    });
  };

  const onNeutralizeVoteThreadDetail = (id) => {
    dispatch(
      asyncVoteThread({
        threadId: id,
        voteType: 0,
      })
    ).then(() => {
      dispatch(asyncReceiveThreadDetail(id));
    });
  };

  const onCommentSubmit = (content) => {
    dispatch(asyncCreateComment({ threadId, content }));
  };

  const onUpVoteComment = (id) => {
    dispatch(
      asyncVoteThreadDetail({
        threadId,
        commentId: id,
        voteType: 1,
      })
    );
  };

  const onDownVoteComment = (id) => {
    dispatch(
      asyncVoteThreadDetail({
        threadId,
        commentId: id,
        voteType: -1,
      })
    );
  };

  const onNeutralizeVoteComment = (id) => {
    dispatch(
      asyncVoteThreadDetail({
        threadId,
        commentId: id,
        voteType: 0,
      })
    );
  };

  if (threadDetail === null) {
    return <NotFoundPage />;
  }

  return (
    <Container maxWidth="sm" sx={{ pb: 2, justifyItems: 'center' }}>
      <Card sx={{ width: '100%', padding: 2 }}>
        <ThreadDetail
          {...threadDetail}
          authUser={authUser.id}
          upVoteThreadDetail={onUpVoteThreadDetail}
          downVoteThreadDetail={onDownVoteThreadDetail}
          neutralizeVoteThreadDetail={onNeutralizeVoteThreadDetail}
        />
        <CommentInput addComment={onCommentSubmit} />
      </Card>
      <Card sx={{ width: '100%', padding: 2 }}>
        <Typography
          sx={{ fontSize: 18, mt: 2, ml: 2, fontWeight: 'bold' }}
          gutterBottom
        >
          Komentar({threadDetail.comments.length})
        </Typography>
        <CommentsList
          comments={threadDetail.comments}
          authUser={authUser.id}
          upVoteComment={onUpVoteComment}
          downVoteComment={onDownVoteComment}
          neutralizeVoteComment={onNeutralizeVoteComment}
        />
      </Card>
    </Container>
  );
}
