import { create } from "zustand";

export const useFavoritesStore = create((set) => ({
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  addFavorite: (user) =>
    set((state) => {
      const updatedFavorites = [...state.favorites, user];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),
  removeFavorite: (id) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter((user) => user.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    }),
  clearFavorites: () => {
    localStorage.removeItem("favorites");
    set({ favorites: [] });
  },
}));
