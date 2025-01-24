// store/socketStore.jsx
import { create } from "zustand";
import { io } from "socket.io-client";

export const useSocketStore = create((set, get) => ({
  socket: null,
  messages: [],
  users: [],
  consId: null,

  connectSocket: (userId, ownUserID) => {
    const socketInstance = io("wss://back.sovchilar.net");

    set({ socket: socketInstance });

    socketInstance.on("connect", () => {
      socketInstance.emit("login", { ownUserID });
    });

    socketInstance.on("conversationCreated", (conversation) => {
        console.log(conversation);
        
      set({ consId: conversation.id });
    });

    socketInstance.on("newMessage", (data) => {
      set((state) => ({ messages: [...state.messages, data] }));
    });

    socketInstance.on("conversation-messages", (data) => {
      set({ messages: data?.data?.items?.reverse() || [] });
    });

    socketInstance.on("conversations", (response) => {
      set({ users: response?.data?.items || [] });
    });

    socketInstance.emit("get-conversations", { userId });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, messages: [], users: [], consId: null });
    }
  },

  sendMessage: (messageData) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("sendMessage", messageData);
    }
  },

  createConversation: (userId, ownUserID) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("createConversation", {
        userId1: ownUserID,
        userId2: userId,
      });
      set({ consId: userId });
    }
  },

  fetchMessages: (conversationId) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("get-conversation-messages", { conversationId, page: 1, limit: 20 });
    }
  },
}));
