import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useChatStore } from "../../store/chatStore";
import { useStore } from "../../store/store";

const Chat = () => {
  const { userChat, addUserChat } = useChatStore();
  const { user } = useStore();
  const [messages, setMessages] = useState([]);
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
      socketInstance.emit("login", { userId: user?.id });
    });

    socketInstance.on("loginSuccess", () => {
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
      console.log(data);
      
      console.log("New message:ss", message);

        setMessages((prevMessages) => [
          ...prevMessages,
          {...data}, // Foydalanuvchiga bog'liq format
        ]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  console.log(messages);
  
  

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

  function getHoursAndMinutesString(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0"); // Soatni olish
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Minutni olish
    return `${hours}:${minutes}`;
  }

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
          <div className="flex flex-col p-4 overflow-y-auto bg-gray-100 overflow-x-hidden">
            {messages?.map((msg, index) => (
              <div
                key={index}
                style={{ borderRadius: msg?.sender?.id !== user?.id ? "20px 20px 20px 0" : "20px 20px 0 20px" }}
                className={`my-2 p-3 pb-[14px] bg-white  border border-gray-300 rounded-lg max-w-xs min-w-[100px] relative ${
                  msg?.sender?.id === user?.id
                    ? " self-end" // Foydalanuvchining o'zi yuborgan xabar
                    : " self-start" // Boshqa foydalanuvchi yuborgan xabar
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
