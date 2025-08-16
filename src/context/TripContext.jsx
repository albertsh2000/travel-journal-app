import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { COLLECTIONS } from "../constants";

const TripContext = createContext();

const dummyTrips = [
  {
    id: nanoid(),
    destination: "Tokyo",
    description: "The bustling capital of Japan.",
  },
  {
    id: nanoid(),
    destination: "New York",
    description: "The city that never sleeps.",
  },
];

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);

  const fetchTrips = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, COLLECTIONS.TRIPS));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const addTrip = useCallback(async (trip) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.TRIPS), trip);
      setTrips((prev) => [{ id: docRef.id, ...trip }, ...prev]);
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  }, []);

  const deleteTrip = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.TRIPS, id));
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  }, []);

  const contextValue = useMemo(() => {
    return {
      trips,
      combinedTrips: [...trips, ...dummyTrips],
      addTrip,
      deleteTrip,
    };
  }, [trips, addTrip, deleteTrip]);

  return (
    <TripContext.Provider value={contextValue}>{children}</TripContext.Provider>
  );
};

export const useTrips = () => useContext(TripContext);
