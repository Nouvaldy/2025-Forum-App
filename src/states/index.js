import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import threadDetailReducer from './threadDetail/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import commentsReducer from './comments/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    comments: commentsReducer,
    isPreload: isPreloadReducer,
    leaderboards: leaderboardsReducer,
    threadDetail: threadDetailReducer,
    threads: threadsReducer,
    loadingBar: loadingBarReducer,
    users: usersReducer,
  },
});

export default store;
