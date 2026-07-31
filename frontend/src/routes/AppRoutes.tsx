import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
// import AvailabilityPage from "../pages/availability/AvailabilityPage";
import Login from "../pages/Login";
import Register from "../pages/register";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/availability"
          element={
            <DashboardLayout>
              <AvailabilityPage />
            </DashboardLayout>
          }
        /> */}
        <Route
          path="/login"
          element={
            <DashboardLayout>
              <Login />
            </DashboardLayout>
          }
        />
        <Route
          path="/register"
          element={
            <DashboardLayout>
              <Register />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
