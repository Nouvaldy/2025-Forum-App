import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asynchPreloadProcess } from './states/isPreload/action';
// import { asynchUnsetAuthUser } from './states/authUser/action';

function App() {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states
  ); // @TODO: get authUser and isPreLoad state from store

  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  useEffect(() => {
    // @TODO: dispatch async action to preload app
    dispatch(asynchPreloadProcess());
  }, [dispatch]);

  // const onSignOut = () => {
  //   // @TODO: dispatch async action to sign out
  //   dispatch(asynchUnsetAuthUser());
  // };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <main>
          <Routes>
            <Route path="/*" />
            <Route path="/register" />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="app-container">
        <header>
        </header>
        <main>
        </main>
      </div>
    </>
  );
}

export default App;
