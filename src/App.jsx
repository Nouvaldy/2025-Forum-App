// import React, { useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { asynchPreloadProcess } from './states/isPreload/action';
// // import { asynchUnsetAuthUser } from './states/authUser/action';

// function App() {
//   const { authUser = null, isPreload = false } = useSelector(
//     (states) => states
//   ); // @TODO: get authUser and isPreLoad state from store

//   const dispatch = useDispatch(); // @TODO: get dispatch function from store

//   useEffect(() => {
//     // @TODO: dispatch async action to preload app
//     dispatch(asynchPreloadProcess());
//   }, [dispatch]);

//   // const onSignOut = () => {
//   //   // @TODO: dispatch async action to sign out
//   //   dispatch(asynchUnsetAuthUser());
//   // };

//   if (isPreload) {
//     return null;
//   }

//   if (authUser === null) {
//     return (
//       <>
//         <main>
//           <Routes>
//             <Route path="/*" />
//             <Route path="/register" />
//           </Routes>
//         </main>
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="app-container">
//         <header>
//         </header>
//         <main>
//         </main>
//       </div>
//     </>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import DetailPage from "./pages/DetailPage";
import AddThreadPage from "./pages/AddThreadPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import Loading from "./components/Loading";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { isPreload = false, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };
  if (isPreload) {
    return null;
  }
  if (authUser === null) {
    return (
      <>
        <Loading />
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Loading />
      <Navigation authUser={authUser} signOut={onSignOut} />
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<AddThreadPage />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
        <Route path="/thread/:threadId" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
