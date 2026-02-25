import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export const useItineraryStore = create(
  persist(
    (set) => ({
      selectedCity: null,
      itineraries: {},

      setSelectedCity: (city) =>
        set({ selectedCity: city }),

      addDay: (cityKey) =>
        set((state) => {
          const current = state.itineraries[cityKey] || [];

          return {
            itineraries: {
              ...state.itineraries,
              [cityKey]: [
                ...current,
                { id: uuidv4(), activities: [] }
              ]
            }
          };
        }),

      addActivity: (cityKey, dayId, activity) =>
        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [cityKey]: state.itineraries[cityKey].map((day) =>
              day.id === dayId
                ? {
                    ...day,
                    activities: [...day.activities, activity]
                  }
                : day
            )
          }
        })),

      removeActivity: (cityKey, dayId, index) =>
        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [cityKey]: state.itineraries[cityKey].map((day) =>
              day.id === dayId
                ? {
                    ...day,
                    activities: day.activities.filter(
                      (_, i) => i !== index
                    )
                  }
                : day
            )
          }
        }))
    }),
    {
      name: "itinerary-storage"
    }
  )
);