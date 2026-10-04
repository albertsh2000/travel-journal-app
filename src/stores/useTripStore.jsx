import { create } from "zustand"

import { db } from "../firebase"

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore"

import { COLLECTIONS, ERROR_MESSAGES } from "../constants"

import useAuthStore from "./useAuthStore"

const dummyTrips = [
  {
    id: "dummy-tokyo",
    destination: "Tokyo",
    description: "The bustling capital of Japan.",
  },
  {
    id: "dummy-new-york",
    destination: "New York",
    description: "The city that never sleeps.",
  },
]

const useTripStore = create((set, get) => ({
  trips: [],
  dummyTrips,
  hasFetched: false,

  fetchTrips: async () => {
    try {
      const user = useAuthStore.getState().user

      if (!user?.uid) {
        throw new Error("Not authenticated")
      }

      const tripsQuery = query(
        collection(db, COLLECTIONS.TRIPS),
        where("userId", "==", user.uid),
      )

      const snapshot = await getDocs(tripsQuery)

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      set({
        trips: data,
        hasFetched: true,
      })
    } catch (error) {
      console.error(ERROR_MESSAGES.FETCH_TRIPS, error)
    }
  },

  getTripById: async (id) => {
    try {
      // First check local demo trips
      const demoTrip = get().dummyTrips.find((trip) => trip.id === id)

      if (demoTrip) {
        return demoTrip
      }

      const user = useAuthStore.getState().user

      if (!user?.uid) {
        throw new Error("Not authenticated")
      }

      // Get the specific Firestore document
      const tripRef = doc(db, COLLECTIONS.TRIPS, id)
      const snapshot = await getDoc(tripRef)

      if (!snapshot.exists()) {
        throw new Error("Trip not found")
      }

      const trip = {
        id: snapshot.id,
        ...snapshot.data(),
      }

      // Extra client-side ownership check
      if (trip.userId !== user.uid) {
        throw new Error("You do not have permission to view this trip")
      }

      return trip
    } catch (error) {
      console.error(ERROR_MESSAGES.FETCH_TRIPS, error)
      throw error
    }
  },

  addTrip: async (trip) => {
    try {
      const user = useAuthStore.getState().user

      if (!user?.uid) {
        throw new Error("Not authenticated")
      }

      const tripWithOwner = {
        ...trip,
        userId: user.uid,
      }

      const docRef = await addDoc(
        collection(db, COLLECTIONS.TRIPS),
        tripWithOwner,
      )

      set((state) => ({
        trips: [{ id: docRef.id, ...tripWithOwner }, ...state.trips],
      }))
    } catch (error) {
      console.error(ERROR_MESSAGES.ADD_TRIP, error)
      throw error
    }
  },

  deleteTrip: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.TRIPS, id))

      set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== id),
      }))
    } catch (error) {
      console.error(ERROR_MESSAGES.DELETE_TRIP, error)
    }
  },

  updateTrip: async (id, updatedData) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.TRIPS, id), updatedData)

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === id ? { ...trip, ...updatedData } : trip,
        ),
      }))
    } catch (error) {
      console.error(ERROR_MESSAGES.UPDATE_TRIP, error)
      throw error
    }
  },

  getCombinedTrips: () => {
    const { trips, dummyTrips } = get()

    return [...trips, ...dummyTrips]
  },
}))

export default useTripStore
