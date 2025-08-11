import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import MyJournal from "../pages/MyJournal";
import AddTrip from "../pages/AddTrip";
import ProtectedRoute from "../components/ProtectedRoute";
import { MENU_KEYS } from "../constants";

const AppRoutes = () => (
  <Routes>
    <Route path={MENU_KEYS.HOME} element={<Home />} />
    <Route path={MENU_KEYS.EXPLORE} element={<Explore />} />
    <Route path={MENU_KEYS.LOGIN} element={<Login />} />
    <Route
      path={MENU_KEYS.MY_JOURNAL}
      element={
        <ProtectedRoute>
          <MyJournal />
        </ProtectedRoute>
      }
    />
    <Route
      path={MENU_KEYS.ADD_TRIP}
      element={
        <ProtectedRoute>
          <AddTrip />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
