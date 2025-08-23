import React from "react";
import Loader from "./components/Loader";

import router from "./routes/appRoutes";

import { RouterProvider } from "react-router-dom";
import useAuthStore from "./stores/useAuthStore";

const App = () => {
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  if (!isAuthReady) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
};

export default App;
