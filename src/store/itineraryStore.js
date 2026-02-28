import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export const useItineraryStore = create(
  persist(
    (set, get) => ({
      selectedCity: null,
      itineraries: {},
      budgets: {},
      tripDates: {},

      setSelectedCity: (city) =>
        set({ selectedCity: city }),

      setBudget: (cityKey, amount) =>
        set((state) => ({
          budgets: {
            ...state.budgets,
            [cityKey]: amount,
          },
        })),

      setTripDates: (cityKey, dates) =>
        set((state) => ({
          tripDates: {
            ...state.tripDates,
            [cityKey]: dates,
          },
        })),

      addDay: (cityKey) =>
        set((state) => {
          const existing = state.itineraries[cityKey] || [];

          return {
            itineraries: {
              ...state.itineraries,
              [cityKey]: [
                ...existing,
                { id: uuidv4(), activities: [] },
              ],
            },
          };
        }),

      removeDay: (cityKey, dayId) =>
        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [cityKey]:
              (state.itineraries[cityKey] || []).filter(
                (day) => day.id !== dayId
              ),
          },
        })),

      addActivity: (cityKey, dayId, activity) =>
        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [cityKey]:
              (state.itineraries[cityKey] || []).map((day) =>
                day.id === dayId
                  ? {
                      ...day,
                      activities: [...day.activities, activity],
                    }
                  : day
              ),
          },
        })),

      removeActivity: (cityKey, dayId, index) =>
        set((state) => ({
          itineraries: {
            ...state.itineraries,
            [cityKey]:
              (state.itineraries[cityKey] || []).map((day) =>
                day.id === dayId
                  ? {
                      ...day,
                      activities: day.activities.filter(
                        (_, i) => i !== index
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