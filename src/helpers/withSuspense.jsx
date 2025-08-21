import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const withSuspense = (Component) => {
  return function SuspendedComponent() {
    const location = useLocation();
    return (
      <Suspense fallback={<Loader />} key={location.pathname}>
        <Component />
      </Suspense>
    );
  };
};

export default withSuspense;
