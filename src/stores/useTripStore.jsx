import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiService from "../apiService";
import { MOCK_API_TRIPS_URL } from "../constants";

const useTripStore = create(
  persist(
    (set, get) => ({
      trips: [],
      hasFetched: false,

      fetchTrips: async () => {
        const data = await apiService.get(MOCK_API_TRIPS_URL);
        set({ trips: data, hasFetched: true });
      },

      addTrip: async (trip) => {
        const newTrip = await apiService.post(MOCK_API_TRIPS_URL, trip);
        set((state) => ({
          trips: [newTrip, ...state.trips],
        }));
      },

      deleteTrip: async (id) => {
        await apiService.delete(`${MOCK_API_TRIPS_URL}/${id}`);
        set((state) => ({
          trips: state.trips.filter((trip) => trip.id !== id),
        }));
      },

      getTripById: async (id) => {
        const data = await apiService.get(`${MOCK_API_TRIPS_URL}/${id}`);
        return data;
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
