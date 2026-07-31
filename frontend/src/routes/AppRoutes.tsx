import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import AvailabilityPage from "../pages/availability/AvailabilityPage";
import Login from "../pages/Login";
import Register from "../pages/register";
import AuthGuard from "../components/guard/AuthGuard";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
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

        <Route element={<AuthGuard />}>
          <Route
            path="/availability"
            element={
              <DashboardLayout>
                <AvailabilityPage />
              </DashboardLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
