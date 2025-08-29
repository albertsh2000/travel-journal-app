import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { ERROR_MESSAGES, MOCK_API_TRIPS_URL } from "../constants";

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

const useTripStore = create(
  persist(
    (set, get) => ({
      trips: [],
      dummyTrips,
      hasFetched: false,

      fetchTrips: async () => {
        try {
          const res = await fetch(MOCK_API_TRIPS_URL);
          const data = await res.json();
          set({ trips: data, hasFetched: true });
        } catch (error) {
          console.error(ERROR_MESSAGES.FETCH_TRIPS, error);
        }
      },

      addTrip: async (trip) => {
        try {
          const res = await fetch(MOCK_API_TRIPS_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(trip),
          });
          const newTrip = await res.json();

          set((state) => ({
            trips: [newTrip, ...state.trips],
          }));
        } catch (error) {
          console.error(ERROR_MESSAGES.ADD_TRIP, error);
        }
      },

      deleteTrip: async (id) => {
        try {
          await fetch(`${MOCK_API_TRIPS_URL}/${id}`, {
            method: "DELETE",
          });
          set((state) => ({
            trips: state.trips.filter((trip) => trip.id !== id),
          }));
        } catch (error) {
          console.error(ERROR_MESSAGES.DELETE_TRIP, error);
        }
      },

      getCombinedTrips: () => {
        const { trips } = get();
        return [...trips];
      },
    }),
    {
      name: "trip-storage",
      partialize: (state) => ({
        trips: state.trips,
      }),
    }
  )
);

export default useTripStore;
