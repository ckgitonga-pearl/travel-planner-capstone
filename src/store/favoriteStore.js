import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (city) => {
        const favorites = get().favorites;

        const cityKey =
          city.id ||
          `${city.name}-${city.address?.countryCode}`;

        const exists = favorites.some((fav) => {
          const favKey =
            fav.id ||
            `${fav.name}-${fav.address?.countryCode}`;

          return favKey === cityKey;
        });

        if (!exists) {
          set({
            favorites: [...favorites, city],
          });
        }
      },

      removeFavorite: (iataCode) =>
  set((state) => ({
    favorites: state.favorites.filter(
      (city) => city.iataCode !== iataCode
    ),
  })),
    }),
    {
      name: "travel-favorites", // localStorage key
    }
  )
);