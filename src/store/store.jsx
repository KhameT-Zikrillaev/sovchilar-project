import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      // User va tokenlarni saqlash
      setUser: (data) =>
        set({
          user: data.user,
          accessToken: data.tokens.accessToken,
          refreshToken: data.tokens.refreshToken,
        }),

      setUserSingle: (data) =>{
        set({
          user: data,
        })
      },

      // Tokenlarni yangilash
      //   updateTokens: (newAccessToken, newRefreshToken) =>
      //     set({
      //       accessToken: newAccessToken,
      //       refreshToken: newRefreshToken,
      //     }),

      // Hammasini tozalash
      clearUser: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
    }),
    {
      name: "user-sovchilar", // LocalStorage kaliti
      getStorage: () => localStorage, // LocalStorage orqali saqlash
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
