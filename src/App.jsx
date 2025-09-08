import React, { useEffect } from "react";
import Loader from "./components/Loader";
import router from "./routes/appRoutes";
import { RouterProvider } from "react-router-dom";
import useAuthStore from "./stores/useAuthStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLanguageStore } from "./stores/useLanguageStore";
import i18n from "./i18n";

const App = () => {
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  if (!isAuthReady) {
    return <Loader />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
