import React, { lazy } from "react";
import withSuspense from "../helpers/withSuspense";
import MainLayout from "../components/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { MENU_KEYS } from "../constants";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Explore = lazy(() => import("../pages/Explore"));
const Login = lazy(() => import("../pages/Login"));
const MyJournal = lazy(() => import("../pages/MyJournal"));
const AddTrip = lazy(() => import("../pages/AddTrip"));
const TripCardDetails = lazy(() => import("../pages/TripCardDetails"));
const NotFound = lazy(() => import("../pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: MENU_KEYS.HOME,
        element: React.createElement(withSuspense(Home)),
      },
      {
        path: MENU_KEYS.EXPLORE,
        element: React.createElement(withSuspense(Explore)),
      },
      {
        path: MENU_KEYS.LOGIN,
        element: React.createElement(withSuspense(Login)),
      },
      {
        path: MENU_KEYS.MY_JOURNAL,
        element: React.createElement(
          withSuspense(() => (
            <ProtectedRoute>
              <MyJournal />
            </ProtectedRoute>
          ))
        ),
      },
      {
        path: MENU_KEYS.ADD_TRIP,
        element: React.createElement(
          withSuspense(() => (
            <ProtectedRoute>
              <AddTrip />
            </ProtectedRoute>
          ))
        ),
      },
      {
        path: MENU_KEYS.CARD_DETAILS,
        element: React.createElement(
          withSuspense(() => (
            <ProtectedRoute>
              <TripCardDetails />
            </ProtectedRoute>
          ))
        ),
      },
      {
        path: "*",
        element: React.createElement(withSuspense(NotFound)),
      },
    ],
  },
]);

export default router;
