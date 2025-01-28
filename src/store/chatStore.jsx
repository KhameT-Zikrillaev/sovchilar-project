import { create } from "zustand";

export const useChatStore = create((set) => ({
  userChat: null,

  addUserChat: (user) =>
    set(() => ({
      userChat: user,
    })),

  removeUserChat: () =>
    set(() => ({
      userChat: null,
    })),
}));