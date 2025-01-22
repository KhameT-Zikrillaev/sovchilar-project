import { create } from "zustand";

export const useChatStore = create((set) => ({
  userId: null,
  addUserId: (id) =>
    set(() => ({
      userId: id, 
    })),
}));