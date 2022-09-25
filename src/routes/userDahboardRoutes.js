import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from '../components/sideBar/Index';
import CollegeDetail from "../pages/collegeDetail/collegeDetail";
import MyCollegeList from "../pages/myCollegeList/myCollegeList";
import PersonalInfo from "../pages/personalInfo/personalInfo";
import Scholorship from "../pages/scholorship/scholorship";
import ApplicationForm from "../pages/applicationForm/applicationForm";
import ApplyForAdmission from "../pages/applyForAdmission/applyForAdmission";
import ViewApplicationForm from "../pages/viewApplication/viewApplication";
import PastPaperList from "../pages/pastPaperlist/PastPaperList";

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
                    <Route exact path="/personal" element={<PersonalInfo />} />
                    <Route exact path="/admissionForm/:collegeId" element={<ApplicationForm />} />
                    <Route exact path="/admissions" element={<ApplyForAdmission />} />
                    <Route exact path="/admissionDetail/:id" element={<ViewApplicationForm />} />
                    <Route exact path="/pastPapers" element={<PastPaperList />} />
                </Routes>
            </SideBar>
        </React.Suspense>
    );
};

export default UserDashboardRoutes;
