import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useChatStore } from "../../store/chatStore";
import { useStore } from "../../store/store";

const Chat = () => {
  const { userChat, addUserChat } = useChatStore();
  const { user } = useStore();
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [activeUser, setActiveUser] = useState(userChat?.id);
  const [showChat, setShowChat] = useState(userChat ? true : false);
  const [searchTerm, setSearchTerm] = useState("");
  const [socket, setSocket] = useState(null);
  const [consId, setConsId] = useState(null);

  const [users, setUsers] = useState([userChat]);

  useEffect(() => {
    const socketInstance = io("wss://back.sovchilar.net");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to server");
      socketInstance.emit("login", { userId: user?.id });
    });

    socketInstance.on("loginSuccess", () => {
      console.log("Login successful");
    });

    // Muloqot yaratish hodisasi
    socketInstance.on("conversationCreated", (conversation) => {
      console.log("Conversation created:", conversation);
      setConsId(conversation.id);
      // Yangi conversation yaratildi, uni foydalanuvchilar ro'yxatiga qo'shish
      setUsers((prevUsers) => [...prevUsers, conversation]);
    });

    socketInstance.on("newMessage", (data) => {
      const { conversationId, message } = data;
      console.log("New message:", message);

      setMessages((prevMessages) => ({
        ...prevMessages,
        [conversationId]: [...(prevMessages[conversationId] || []), message],
      }));
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  const sendMessage = () => {
    if (input.trim() && socket && consId) {
      const messageData = {
        senderId: user?.id, // Foydalanuvchi ID
        conversationId: consId,
        message: input,
      };

      // Serverga xabarni yuborish
      socket.emit("sendMessage", messageData);

      // Mahalliy holatni yangilash
      setMessages((prevMessages) => ({
        ...prevMessages,
        [consId]: [
          ...(prevMessages[consId] || []),
          { text: input, sender: "user" },
        ],
      }));
      setInput(""); // Inputni tozalash
    }
  };

  const createConversation = (userId) => {
    if (socket) {
      socket.emit("createConversation", { userId1: user?.id, userId2: userId });
      setActiveUser(userId);
      setShowChat(true);
    }
  };

  const filteredUsers = users.filter((user) =>
    user?.firstName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 pt-24">
      <div
        className={`bg-white pt-4 border-r shadow-md ${
          showChat ? "hidden md:block w-1/4" : "block md:w-1/4 w-full"
        }`}
      >
        <div className="px-2">
          <input
            type="text"
            placeholder="Search users..."
            className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 pb-14 px-1">
          {filteredUsers.map((user, index) => (
            <li
              key={index}
              className={`flex gap-3 items-center p-2 hover:bg-red-100 cursor-pointer rounded-md ${
                activeUser === user?.id ? "bg-red-200" : ""
              }`}
              onClick={() => createConversation(user?.id)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <span className="text-gray-700">{user?.firstName}</span>
            </li>
          ))}
        </ul>
      </div>
      {showChat && (
        <div className="flex-1 flex flex-col">
          <div className="bg-red-600 text-white p-4 flex justify-between items-center shadow-md">
            <button onClick={() => setShowChat(false)} className="text-white">
              Back
            </button>
            <h2 className="text-lg font-semibold">{userChat?.firstName}</h2>
            <div></div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100 overflow-x-hidden">
            {messages[consId]?.map((msg, index) => (
              <div
                key={index}
                style={{ borderRadius: "10px 10px 10px 0" }}
                className={`my-2 p-3 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-red-300 self-end"
                    : "bg-white self-start border border-gray-300"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex p-2 bg-white border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
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
