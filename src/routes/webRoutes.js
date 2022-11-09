import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import HomePage from "../pages/Home";
import SignIn from "../pages/SignIn/index";
import SignUp from "../pages/Signup/index";
// import ResetPassword from '../pages/ResetPassword';
// import Colleges from '../pages/colleges/colleges';
// import Scholorships from '../pages/scholorships/sholorships';
// import PastPapers from '../pages/pastPapers/pastPapers';
// import ScrollToTop from '../components/ScrollToTop';
// import SideBar from '../components/sideBar/Index';
import {
  ProtectedAuthRoute,
  ProtectedRoute,
  ProtectedLandingPage,
  ProtectedAdminRoute,
  // ProtectedStudentRoute,
} from "./protectedAuthRoutes";
import AdminRoutes from "./adminRoutes";
import Logout from "./../pages/logout/logout";
import AboutUs from "../pages/aboutUs/aboutUs";
import ContactUs from "../pages/contactUs/contactUs";
import Shops from "../pages/shops/shops";
import UserPurchasedShops from "../pages/userPurchasedShops/userPurchasedShops";
import UserLevey from "../pages/userLevey/userLevey";
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
            </ProtectedLandingPage>
          }
        />
        <Route
          exact
          path="/aboutUs"
          element={
            <ProtectedLandingPage>
              <AboutUs />
            </ProtectedLandingPage>
          }
        />
        <Route
          exact
          path="/contactUs"
          element={
            <ProtectedLandingPage>
              <ContactUs />
            </ProtectedLandingPage>
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
          path="/shops"
          element={
            <ProtectedLandingPage>
              <Shops />
            </ProtectedLandingPage>
          }
        />
        <Route
          exact
          path="/myShops"
          element={
            <ProtectedLandingPage>
              <UserPurchasedShops />
            </ProtectedLandingPage>
          }
        />

        <Route
          exact
          path="/levey"
          element={
            <ProtectedLandingPage>
              <UserLevey />
            </ProtectedLandingPage>
          }
        />

        <Route
          exact
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminRoutes />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </React.Suspense>
  );
}
