import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/sideBar/Index";
import AddShop from "../pages/adminPages/addShop/addShop";
import AdminShops from "../pages/adminPages/adminShops/adminShops";
import Analytics from "../pages/adminPages/analytics/analytics";
import ContactUs from "../pages/adminPages/analytics/analytics";
import InterestForm from "../pages/adminPages/interestForm/interestForm";

const InstituteRoutes = () => {
  return (
    <React.Suspense fallback={"Loading.."}>
      <SideBar>
        <Routes>
          <Route exact path="/stats" element={<Analytics />} />
          <Route exact path="/addShop" element={<AddShop />} />
          <Route exact path="/interestForm" element={<InterestForm />} />
          <Route exact path="/shops" element={<AdminShops />} />
        </Routes>
      </SideBar>
    </React.Suspense>
  );
};

export default InstituteRoutes;