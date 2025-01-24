import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useChatStore } from "../../store/chatStore";
import { useStore } from "../../store/store";

const Chat = () => {
  const { userChat, addUserChat } = useChatStore();
  const { user } = useStore();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeUser, setActiveUser] = useState(userChat?.id || null);
  const [showChat, setShowChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [socket, setSocket] = useState(null);
  const [consId, setConsId] = useState(null);
  const [users, setUsers] = useState([]);
  const messagesContainerRef = useRef(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Brauzer bildirishnomalariga ruxsat so'rash
  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log("Notifications enabled");
          } else {
            console.log("Notifications denied");
          }
        });
      }
    }
  }, []);

  // Socket ulanish va hodisalarni sozlash
  useEffect(() => {
    if (!user?.id) return;

    const socketInstance = io("wss://back.sovchilar.net", {
      query: { userId: user.id },
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      socketInstance.emit("login", { userId: user.id });
    });

    socketInstance.on("conversationCreated", (conversation) => {
      setConsId(conversation.id);
    });

    socketInstance.on("newMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      // Notification ko'rsatish
      if (Notification.permission === "granted" && data?.sender?.id !== user.id) {
        new Notification("Yangi xabar", {
          body: `${data?.sender?.firstName}: ${data?.message}`,
        });
      }
    });

    socketInstance.on("conversation-messages", (data) => {
      setMessages(data?.data?.items?.reverse() || []);
    });

    socketInstance.emit("get-conversations", { userId: user.id });

    socketInstance.on("conversations", (response) => {
      setUsers(response?.data?.items || []);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  // Suhbat xabarlarini olish
  useEffect(() => {
    if (socket && consId) {
      socket.emit("get-conversation-messages", { conversationId: consId, page: 1, limit: 20 });
    }
  }, [socket, consId]);

  const createConversation = useCallback(
    (userId) => {
      if (socket) {
        socket.emit("createConversation", { userId1: user?.id, userId2: userId });
        setActiveUser(userId);
        setShowChat(true);
      }
    },
    [socket, user]
  );

  useEffect(() => {
    if (userChat?.id && socket) {
      createConversation(userChat?.id);
    }
  }, [userChat, socket, createConversation]);

  const sendMessage = useCallback(() => {
    if (input.trim() && socket && consId) {
      socket.emit("sendMessage", {
        senderId: user?.id,
        conversationId: consId,
        message: input,
      });
      setInput("");
    }
  }, [input, socket, consId, user]);

  const filteredUsers = useMemo(
    () =>
      users.filter((u) =>
        u?.participants[0]?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  const getHoursAndMinutesString = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };     

  return (
    <div className="flex h-screen bg-gray-50 pt-24">
      {/* Foydalanuvchi ro'yxati */}
      <div
        className={`bg-white pt-4 border-r shadow-md ${
          showChat ? "hidden md:block w-1/4" : "block md:w-1/4 w-full"
        }`}
      >
        <div className="px-2">
          <input
            type="text"
            placeholder="Search users..."
            className="p-2 border border-gray-300 rounded-lg mb-2 w-full focus:outline-none focus:ring-1 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 pb-14 px-1">
          {filteredUsers.map((user, index) => (
            <li
              key={index}
              className={`flex gap-3 items-center p-2 hover:bg-red-100 cursor-pointer rounded-md ${
                activeUser === user?.participants[0]?.id ? "bg-red-200" : ""
              }`}
              onClick={() => {
                createConversation(user?.participants[0]?.id);
                addUserChat(user?.participants[0]);
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300">{user?.participants[0]?.imageUrl && <img className="w-8 h-8 rounded-full object-cover" src={user?.participants[0]?.imageUrl} alt="userpic" />}</div>
              <span className="text-gray-700">{user?.participants[0]?.firstName}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat bo'limi */}
      {showChat && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="bg-red-600 text-white p-4 flex justify-between items-center shadow-md">
            <button
              onClick={() => {
                setShowChat(false);
                setActiveUser(null);
                setConsId(null);
              }}
              className="text-white"
            >
              Back
            </button>
            <h2 className="text-lg font-semibold">{userChat?.firstName}</h2>
            <div className="flex flex-col gap-[5px] cursor-pointer w-[20px]"> <div className="w-[6px] h-[6px] bg-white rounded-full"></div> <div className="w-[6px] h-[6px] bg-white rounded-full"></div><div className="w-[6px] h-[6px] bg-white rounded-full"></div> </div>
          </div>
          <div ref={messagesContainerRef} className="flex flex-col p-4 overflow-y-auto h-full bg-gray-100">
            {messages?.map((msg, index) => (
              <div
                key={index}
                style={{
                  borderRadius: msg?.sender?.id !== user?.id ? "20px 20px 20px 0" : "20px 20px 0 20px",
                }}
                className={`my-2 p-3 pb-[14px] bg-white border border-gray-300 rounded-lg max-w-xs min-w-[100px] relative ${
                  msg?.sender?.id === user?.id ? " self-end" : " self-start"
                }`}
              >
                {msg?.message}
                <span className="absolute right-[4px] bottom-[2px] text-[12px] text-gray-600">
                  {getHoursAndMinutesString(msg?.createdAt)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex p-2 bg-white border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-1 focus:ring-red-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
