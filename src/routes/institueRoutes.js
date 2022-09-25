import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from '../components/sideBar/Index';
import Applications from "../pages/institutePanel/applications/Applications";
import PastPaper from "../pages/institutePanel/pastPapers/PastPaper";
import PersonalInfo from "../pages/personalInfo/personalInfo";
import ViewApplicationForm from "../pages/viewApplication/viewApplication";
const InstitueProfile = lazy(() => import("../pages/institutePanel/instutueProfile/instituteProfile"));
const InstitutePrograms = lazy(() => import("./../pages/institutePanel/institutePrograms/institutePrograms"));
const InstituteScholorships = lazy(() => import("../pages/institutePanel/instituteScholorships/instituteScholorships"));

const InstituteRoutes = () => {
    return (
        <React.Suspense fallback={"Loading.."}>
            <SideBar>
                <Routes>
                    <Route exact path="/profile" element={<InstitueProfile />} />
                    <Route exact path="/programs" element={<InstitutePrograms />} />
                    <Route exact path="/scholorships" element={<InstituteScholorships />} />
                    <Route exact path="/applications" element={<Applications />} />
                    <Route exact path="/admissionDetail/:id" element={<ViewApplicationForm />} />
                    <Route exact path="/pastPapers" element={<PastPaper />} />
                    <Route exact path="/personal" element={<PersonalInfo />} />
                </Routes>
            </SideBar>
        </React.Suspense>
    );
};

export default InstituteRoutes;
