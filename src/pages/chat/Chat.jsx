import React, {
  useEffect,
  useState
} from "react";
import { io } from "socket.io-client";
import { useChatStore } from "../../store/chatStore";
import { useStore } from "../../store/store";
import ChatHeader from "./components/ChatHeader";
import ChatUsers from "./components/ChatUsers";
import SendMessage from "./components/SendMessage";
import ChatList from "./components/ChatList";

const Chat = () => {
  const { userChat, addUserChat } = useChatStore();
  const { user } = useStore();
  const [messages, setMessages] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [socket, setSocket] = useState(null);
  const [consId, setConsId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Socket ulanish va hodisalarni sozlash
  
  useEffect(() => {
    if (!user?.id) return;

    const socketInstance = io("wss://back.sovchilar.net", {
      query: { userId: user?.id },
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      socketInstance.emit("login", { userId: user?.id });
    });

    socketInstance.on("conversationCreated", (conversation) => {
      setConsId(conversation?.id);
    });

    socketInstance.on("newMessage", (data) => {

      if (data?.conversation?.id && data?.conversation?.id === consId) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }

      // Notification ko'rsatish
      if (
        Notification.permission === "granted" &&
        data?.sender?.id !== user.id
      ) {
        new Notification("Yangi xabar", {
          body: `${data?.sender?.firstName}: ${data?.message}`,
        });
      }

    });

    socketInstance.on("conversation-messages", (data) => {
      setMessages(data?.data || []);
      setLoading(false);
    });

    socketInstance.on('messagesDeleted', (data) => {
      
      console.log(data);
      
    });

    socketInstance.emit("get-conversations", { userId: user?.id });

    socketInstance.on("conversations", (response) => {
      setUsers(response?.data?.items || []);
      if (userChat) {
        setUsers((prevUsers) => {
          const isAlreadyAdded = prevUsers.some(
            (u) => u?.participants[0]?.id === userChat?.id
          );
          if (!isAlreadyAdded) {
            return [
              ...prevUsers,
              {
                participants: [
                  {
                    id: userChat.id,
                    firstName: userChat.firstName,
                    imageUrl: userChat.imageUrl,
                  },
                ],
              },
            ];
          }
          return prevUsers;
        });
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  // Suhbat xabarlarini olish
  useEffect(() => {
    if (socket && consId) {
      setLoading(true);
      socket.emit("get-conversation-messages", { conversationId: consId });
    }
  }, [socket, consId]);

  return (
    <div className="flex h-screen bg-gray-50 pt-24">
      {/* Foydalanuvchi ro'yxati */}
      <ChatUsers
        activeUser={activeUser}
        addUserChat={addUserChat}
        user={user}
        setShowChat={setShowChat}
        setActiveUser={setActiveUser}
        socket={socket}
        userChat={userChat}
        showChat={showChat}
        users={users}
      />
      {/* Chat bo'limi */}
      {showChat && (
        <div className="flex-1 flex flex-col justify-between">
          <ChatHeader
            userChat={userChat}
            setShowChat={setShowChat}
            setActiveUser={setActiveUser}
            setConsId={setConsId}
            socket={socket}
            setUsers={setUsers}
            setMessages={setMessages}
            consId={consId}
          />
          <ChatList
            messages={messages}
            user={user}
            loading={loading}
            socket={socket}
            consId={consId}
            setMessages={setMessages}
          />
          <SendMessage consId={consId} socket={socket} user={user} />
        </div>
      )}
    </div>
  );
};

export default Chat;
