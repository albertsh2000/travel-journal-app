import React, { useEffect, useState, useCallback } from "react"
import { List, Button, Modal, Space, Input } from "antd"
import { Link } from "react-router-dom"
import TripCard from "../components/TripCard"
import { DELETE_TRIP_CONFIRM_TITLE } from "../constants"
import useTripStore from "../stores/useTripStore"
import { useTranslation } from "react-i18next"
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
]

const useTripStore = create((set, get) => ({
  trips: [],
  dummyTrips,
  hasFetched: false,

  fetchTrips: async () => {
    try {
      const snapshot = await getDocs(collection(db, COLLECTIONS.TRIPS))
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      set({ trips: data, hasFetched: true })
    } catch (error) {
      console.error(ERROR_MESSAGES.FETCH_TRIPS, error)
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
