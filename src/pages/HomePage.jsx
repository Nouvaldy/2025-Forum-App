import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fab, Container, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

import ThreadsList from '../components/ThreadsList';

import asyncReceiveUsersandThreads from '../states/shared/action';
import { asyncVoteThread } from '../states/threads/action';

function HomePage() {
  const [filter, setFilter] = useState('');
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  const categories = new Set(threads.map((thread) => thread.category));

  useEffect(() => {
    dispatch(asyncReceiveUsersandThreads());
  }, [dispatch]);

  const onUpVoteThread = (id) => {
    dispatch(
      asyncVoteThread({
        threadId: id,
        voteType: 1,
      })
    );
  };

  const onDownVoteThread = (id) => {
    dispatch(
      asyncVoteThread({
        threadId: id,
        voteType: -1,
      })
    );
  };

  const onNeutralizeVoteThread = (id) => {
    dispatch(
      asyncVoteThread({
        threadId: id,
        voteType: 0,
      })
    );
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    threadOwner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <Container maxWidth="sm" sx={{ justifyItems:'center' }}>
      {Array.from(categories).map((category) => {
        if (filter === category) {
          return (
            <Button
              key={category}
              variant="contained"
              onClick={() => setFilter('')}
              sx={{ mr: 2, mb: 2 }}
            >
              {`#${category}`}
            </Button>
          );
        }
        return (
          <Button
            key={category}
            variant="outlined"
            onClick={() => setFilter(category)}
            sx={{ mr: 2, mb: 2 }}
          >
            {`#${category}`}
          </Button>
        );
      })}

      <ThreadsList
        threads={
          filter
            ? threadList.filter((thread) => thread.category === filter)
            : threadList
        }
        upVote={onUpVoteThread}
        downVote={onDownVoteThread}
        neutralizeVote={onNeutralizeVoteThread}
      />
      <Link to="/new">
        <Fab
          color="primary"
          aria-label="add"
          sx={{ bottom: 40, right: 40, position: 'fixed' }}
        >
          <AddIcon />
        </Fab>
      </Link>
    </Container>
  );
}

export default HomePage;
