import React, { useContext, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
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
import { ProtectedAuthRoute, ProtectedRoute, ProtectedLandingPage, ProtectedInstitueRoute, ProtectedStudentRoute, } from "./protectedAuthRoutes";
import UserDashboardRoutes from './userDahboardRoutes';
import InstituteRoutes from './institueRoutes';
import Logout from './../pages/logout/logout';
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
          path="/logout"
          element={
            // <ProtectedAuthRoute>
            <Logout />
            // </ProtectedAuthRoute>
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
            <ProtectedStudentRoute>
              <UserDashboardRoutes />
            </ProtectedStudentRoute>
          }
        />
        <Route
          exact
          path="/institute/*"
          element={
            <ProtectedInstitueRoute>
              <InstituteRoutes />
            </ProtectedInstitueRoute>
          }
        />

      </Routes>
      {/* <Footer /> */}
    </React.Suspense>
  );
}
