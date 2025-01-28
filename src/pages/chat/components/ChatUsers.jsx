import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar } from "antd";
import { useTranslation } from "react-i18next";

const ChatUsers = ({
  activeUser,
  setActiveUser,
  setShowChat,
  socket,
  userChat,
  user,
  addUserChat,
  showChat,
  users,
  // unreadCounts
}) => {
  const {t} = useTranslation()
  const [searchTerm, setSearchTerm] = useState("");

  const createConversation = useCallback(
    (userId) => {
      if (socket) {
        socket.emit("createConversation", {
          userId1: user?.id,
          userId2: userId,
        });
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

  const filteredUsers = useMemo(
    () =>
      users?.filter((u) =>
        u?.participants[0]?.firstName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  return (
    <div
      className={`bg-white pt-4 border-r shadow-md ${
        showChat ? "hidden md:block min-w-[350px] w-[350px]" : "block md:w-[350px] md:min-w-[350px] w-full"
      }`}
    >
      <div className="px-2">
        <input
          type="text"
          placeholder={t("chat.user-search")}
          className="p-2 border border-gray-300 rounded-lg mb-2 w-full focus:outline-none focus:ring-1 focus:ring-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 pb-14 px-1">
        {filteredUsers?.map((user, index) => (
          <li
            key={index}
            className={`flex gap-3 items-center border-b justify-between p-2 hover:bg-red-100 cursor-pointer rounded-md ${
              activeUser === user?.participants[0]?.id ? "bg-red-200" : ""
            }`}
          >
            <div
              className="flex items-center gap-3 w-full"
              onClick={() => {
                createConversation(user?.participants[0]?.id);
                addUserChat(user?.participants[0]);
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300">
                {user?.participants[0]?.imageUrl ? (
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={user?.participants[0]?.imageUrl}
                    alt="userpic"
                  />
                ) : (
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    {user?.participants[0]?.firstName?.charAt(0)}
                  </Avatar>
                )}
              </div>
              <span className="text-gray-700">
                {user?.participants[0]?.firstName}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatUsers;
