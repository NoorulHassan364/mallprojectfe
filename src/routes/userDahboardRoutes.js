import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from '../components/sideBar/Index';
import CollegeDetail from "../pages/collegeDetail/collegeDetail";
import MyCollegeList from "../pages/myCollegeList/myCollegeList";
import Scholorship from "../pages/scholorship/scholorship";

const UserDashboard = lazy(() => import("../pages/userDashboard/index"));
const Colleges = lazy(() => import("../pages/colleges/colleges"));

const UserDashboardRoutes = () => {
    return (
        <React.Suspense fallback={"Loading.."}>
            <SideBar>
                <Routes>
                    <Route exact path="/" element={<UserDashboard />} />
                    <Route exact path="/colleges" element={<Colleges />} />
                    <Route exact path="/colleges/detail/:collegeId" element={<CollegeDetail />} />
                    <Route exact path="/myCollegeList" element={<MyCollegeList />} />
                    <Route exact path="/scholorships" element={<Scholorship />} />
                </Routes>
            </SideBar>
        </React.Suspense>
    );
};

export default UserDashboardRoutes;
