import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useChatStore } from "../../store/chatStore";
import { useStore } from "../../store/store";
import ChatHeader from "./components/ChatHeader";
import ChatUsers from "./components/ChatUsers";
import SendMessage from "./components/SendMessage";
import ChatList from "./components/ChatList";
import bgImg from "../../assets/images/left-bg.jpg";

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
  const [device, setDevice] = useState(null);
  const [browserType, setBrowserType] = useState(null);

  // const [unreadCounts, setUnreadCounts] = useState({});

  // Socket ulanish va hodisalarni sozlash

  // const getUserDevice = ()=> {
  //   console.log(navigator.userAgent);

  //   const userAgent = navigator.userAgent.toLowerCase();

  //   if (/iphone/.test(userAgent)) {
  //     return "iPhone";
  //   } else if (/android/.test(userAgent)) {
  //     return "Android";
  //   } else {
  //     return "Kompyuter";
  //   }
  // };
  const getUserDeviceAndBrowser = () => {

    const userAgent = navigator.userAgent.toLowerCase();

    console.log(userAgent);
    
    let device = "Kompyuter";
    let browser = "Noma'lum brauzer";

    // Qurilma turini aniqlash
    const isAndroidLinux = /linux.*android/i.test(userAgent);
    const isIphone = /iphone/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isAndroidLinux) {
      device = "Linux";
    } else if (isAndroid) {
      device = "Android";
    }else if(isIphone){
      device = "iPhone";
    }

    // Brauzerni aniqlash
    const isChrome =
      /chrome/.test(userAgent) ;
    const isFirefox = /firefox/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
    const isEdge = /edg/.test(userAgent);
    const isOpera = /opr/.test(userAgent) || /opera/.test(userAgent);
    const isBrave = /brave/.test(userAgent);

    if (isChrome) {
      browser = "Google";
    } else if (isFirefox) {
      browser = "Mozilla Firefox";
    } else if (isSafari) {
      browser = "Safari";
    } else if (isEdge) {
      browser = "Microsoft Edge";
    } else if (isOpera) {
      browser = "Opera";
    } else if (isBrave) {
      browser = "Brave";
    }

    // iPhone + Chrome tekshirish
    const isIphoneChrome = isIphone && isChrome;

    return { device, browser, isIphoneChrome };
  };

  // Foydalanish

  // Foydalanish

  useEffect(() => {
    setDevice(getUserDeviceAndBrowser().device);
    setBrowserType(getUserDeviceAndBrowser().browser);
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const socketInstance = io("wss://back.sovchilar.net", {
      query: { userId: user?.id },
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      socketInstance.emit("login", { userId: user?.id });
    });
    // socketInstance.emit("getUnreadCounts", { userId: user?.id });

    socketInstance.on("conversationCreated", (conversation) => {
      setConsId(conversation?.id);
    });

    // socketInstance.on("newMessage", (data) => {

    //   if (data?.sender?.id === user?.id || data?.sender?.id === userChat?.id) {
    //     setMessages((prevMessages) => [...prevMessages, data]);

    //   }
    //   // const conversationId = data?.conversation?.id;
    //   // if (conversationId && data?.sender?.id !== user?.id) {
    //   //   setUnreadCounts((prevCounts) => ({
    //   //     ...prevCounts,
    //   //     [conversationId]: (prevCounts[conversationId] || 0) + 1,
    //   //   }));
    //   // }
    //   // Notification ko'rsatish
    //   if (
    //     Notification.permission === "granted" &&
    //     data?.sender?.id !== user.id
    //   ) {
    //     new Notification("Yangi xabar", {
    //       body: `${data?.sender?.firstName}: ${data?.message}`,
    //     });
    //   }

    // });

    // socketInstance.on("unreadCounts", (data) => {
    //   setUnreadCounts(data.counts || {});
    // });

    socketInstance.on("conversation-messages", (data) => {
      setMessages(data?.data || []);

      setLoading(false);

      // setUnreadCounts((prevCounts) => ({
      //   ...prevCounts,
      //   [consId]: 0, // Suhbat ochilganda o'qilmaganlarni 0 ga tushirish
      // }));
    });

    socketInstance.on("messagesDeleted", (data) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== data?.messageIds[0])
      );
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

    socketInstance.on("conversationDeleted", (data) => {
      setUsers((prevUsers) =>
        prevUsers?.filter((u) => u?.id !== data?.conversationId)
      );
      setActiveUser(null);
      setConsId(null);
      setMessages([]);
      setShowChat(false);
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

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      setUsers((prevUsers) => {
        const isAlreadyAdded = prevUsers.some(
          (u) => u?.participants[0]?.id === data?.sender?.id
        );
        if (!isAlreadyAdded && data?.sender?.id !== user?.id) {
          return [
            {
              participants: [
                {
                  id: data?.sender?.id,
                  firstName: data?.sender?.firstName,
                  imageUrl: data?.sender?.imageUrl,
                },
              ],
            },
            ...prevUsers,
          ];
        }
        return prevUsers;
      });
      // addUserChat(data?.sender);

      if (data?.sender?.id === user?.id || data?.sender?.id === userChat?.id) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }

      if (
        Notification.permission === "granted" &&
        data?.sender?.id !== user?.id
      ) {
        new Notification("Yangi xabar", {
          body: `${data?.sender?.firstName}: ${data?.message}`,
        });
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, userChat]);

  

  return (
    <div
      className={`flex ${ device === "Linux" ? "h-screen" :
        device === "iPhone" || device === "Android" ? "h-[90vh]"
          : ""
      }  bg-gray-50 pt-16`}
    >
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
        // unreadCounts={unreadCounts}
      />
      {/* Chat bo'limi */}
      {showChat ? (
        <div className="flex-1 flex flex-col justify-between chat-bg-img">
          <ChatHeader
            userChat={userChat}
            setShowChat={setShowChat}
            setActiveUser={setActiveUser}
            setConsId={setConsId}
            socket={socket}
            setUsers={setUsers}
            setMessages={setMessages}
            consId={consId}
            activeUser={activeUser}
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
      ) : (
        <div className="w-full h-full hidden md:block">
          <img src={bgImg} className="w-full h-full object-cover" alt="" />
        </div>
      )}
    </div>
  );
};

export default Chat;
