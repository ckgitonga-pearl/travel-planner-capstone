import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useItineraryStore = create(
  persist(
    (set) => ({
      itineraries: {},
      selectedCity: null,

      setSelectedCity: (city) =>
        set(() => ({
          selectedCity: city,
        })),

      addDay: (cityKey) =>
        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [cityKey]: [
              ...(state.itineraries[cityKey] || []),
              {
                id: Date.now(),
                activities: [],
              },
            ],
          },
        })),

      addActivity: (cityKey, dayId, activity) =>
        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [cityKey]: state.itineraries[cityKey].map((day) =>
              day.id === dayId
                ? {
                    ...day,
                    activities: [...day.activities, activity],
                  }
                : day
            ),
          },
        })),

      removeActivity: (cityKey, dayId, activityIndex) =>
        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [cityKey]: state.itineraries[cityKey].map((day) =>
              day.id === dayId
                ? {
                    ...day,
                    activities: day.activities.filter(
                      (_, index) => index !== activityIndex
                    ),
                  }
                : day
            ),
          },
        })),
    }),
    {
      name: "itinerary-storage",
    }
  )
);