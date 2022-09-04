import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedAuthRoute({ children }) {
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}


function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  }
  return <Navigate to="/signin" replace />;
}


function ProtectedLandingPage({ children }) {
  const user = localStorage.getItem("user");
  if (!user) {
    return children;
  }
  return <Navigate to="/userDashboard/colleges" replace />;
}

function ProtectedInstitueRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.userType == "student") {
    return <Navigate to="/userDashboard/colleges" replace />;
  }
  return children;
}
function ProtectedStudentRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.userType == "college") {
    return <Navigate to="/institute/profile" replace />;
  } else {
    return children;
  }
}

export {
  ProtectedAuthRoute,
  ProtectedRoute,
  ProtectedLandingPage,
  ProtectedInstitueRoute,
  ProtectedStudentRoute,
};
