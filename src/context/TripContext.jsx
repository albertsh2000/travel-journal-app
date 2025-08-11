import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { LOCAL_STORAGE_TRIPS_KEY } from "../constants";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_TRIPS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TRIPS_KEY, JSON.stringify(trips));
  }, [trips]);

  const addTrip = useCallback((trip) => {
    const newTrip = { id: Date.now(), ...trip };
    setTrips((prev) => [...prev, newTrip]);
  }, []);

  const deleteTrip = useCallback((id) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  }, []);

  const contextValue = useMemo(() => {
    return { trips, addTrip, deleteTrip };
  }, [trips, addTrip, deleteTrip]);

  return (
    <TripContext.Provider value={contextValue}>{children}</TripContext.Provider>
  );
};

export const useTrips = () => useContext(TripContext);
