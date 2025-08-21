import { create } from "zustand";
import { nanoid } from "nanoid";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { COLLECTIONS, ERROR_MESSAGES } from "../constants";

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

const useTripStore = create((set, get) => ({
  trips: [],
  dummyTrips,
  hasFetched: false,

  fetchTrips: async () => {
    try {
      const snapshot = await getDocs(collection(db, COLLECTIONS.TRIPS));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      set({ trips: data, hasFetched: true });
    } catch (error) {
      console.error(ERROR_MESSAGES.FETCH_TRIPS, error);
    }
  },

  addTrip: async (trip) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.TRIPS), trip);
      set((state) => ({
        trips: [{ id: docRef.id, ...trip }, ...state.trips],
      }));
    } catch (error) {
      console.error(ERROR_MESSAGES.ADD_TRIP, error);
    }
  },

  deleteTrip: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.TRIPS, id));
      set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== id),
      }));
    } catch (error) {
      console.error(ERROR_MESSAGES.DELETE_TRIP, error);
    }
  },

  getCombinedTrips: () => {
    const { trips, dummyTrips } = get();
    return [...trips, ...dummyTrips];
  },
}));

export default useTripStore;
