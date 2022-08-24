import React, { useContext, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from '../components/NavBar';
// import Footer from '../components/Footer';
import HomePage from '../pages/Home';
import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/Signup/index';
import UserDashboard from '../pages/userDashboard/index';
// import ResetPassword from '../pages/ResetPassword';
// import Colleges from '../pages/colleges/colleges';
// import Scholorships from '../pages/scholorships/sholorships';
// import PastPapers from '../pages/pastPapers/pastPapers';
// import ScrollToTop from '../components/ScrollToTop';
// import SideBar from '../components/sideBar/Index';
import { ProtectedAuthRoute, ProtectedRoute, ProtectedLandingPage } from "./protectedAuthRoutes";
import UserDashboardRoutes from './userDahboardRoutes';
export default function AppRoutes() {

  return (
    <React.Suspense fallback="Loading...">
      {/* <ProtectedNavbar> */}
      <NavBar user={localStorage.getItem("user")} />
      {/* </ProtectedNavbar> */}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedLandingPage>
              <HomePage />
            // </ProtectedLandingPage>
          }
        />
        <Route
          exact
          path="/signin"
          element={
            <ProtectedAuthRoute>
              <SignIn />
            </ProtectedAuthRoute>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <ProtectedAuthRoute>
              <SignUp />
            </ProtectedAuthRoute>
          }
        />
        <Route
          exact
          path="/userDashboard/*"
          element={
            <ProtectedRoute>
              <UserDashboardRoutes />
            </ProtectedRoute>
          }
        />

      </Routes>
    </React.Suspense>
  );
}
