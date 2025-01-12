import axios from "axios";
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

      setUserSingle: (data) => {
        set({
          user: data,
        });
      },

      setUserSingleReload: async () => {
        const storedUser = JSON.parse(localStorage.getItem("user-sovchilar"))?.state;
        if (storedUser) {
          try {
            const response = await axios.get(`https://back.sovchilar.net/api/users-uz/${storedUser?.user?.id}`, {
              headers: {
                Authorization: `Bearer ${storedUser?.accessToken}`,
              },
            });
            set({
              user: response?.data?.data,
            });
          } catch (error) {
            set({
              user: null,
            });
          }
        }
      },

      updateUserField: (key, value) =>
        set((state) => ({
          user: {
            ...state.user,
            [key]: value,
          },
        })),

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
