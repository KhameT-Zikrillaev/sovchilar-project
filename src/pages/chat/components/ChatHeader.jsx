import { Dropdown, Menu } from "antd";
import { useCallback } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { useChatStore } from "../../../store/chatStore";
import { useTranslation } from "react-i18next";
import { GrFormPreviousLink } from "react-icons/gr";

const ChatHeader = ({
  userChat,
  consId,
  setShowChat,
  setActiveUser,
  setConsId,
  socket,
  setUsers,
  setMessages,
}) => {
  const { t } = useTranslation();
  const { removeUserChat } = useChatStore();

  const deleteConversation = useCallback(
    (conversationId, userId) => {
      if (socket) {
        socket.emit("deleteConversation", {
          conversationId,
          userId,
        });
        // Suhbatni foydalanuvchilar ro'yxatidan olib tashlash
        setUsers((prevUsers) =>
          prevUsers?.filter((u) => u?.participants[0]?.id !== userId)
        );
        setActiveUser(null);
        setConsId(null);
        setMessages([]);
        setShowChat(false);
        removeUserChat();
      }
    },
    [socket]
  );

  const menu = (
    <Menu>
      <Menu.Item
        key="delete"
        onClick={() => deleteConversation(consId, userChat?.id)}
      >
        <div className="flex items-center gap-1 text-[16px] text-red-600">
          {t("chat.chat-delete")}
          <MdDeleteOutline className="text-[20px]" />
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-red-600 text-white p-4 flex justify-between items-center shadow-md">
      <button
        onClick={() => {
          setShowChat(false);
          setActiveUser(null);
          setConsId(null);
        }}
        className="text-white"
      >
        <GrFormPreviousLink className="text-[35px]"/>
      </button>
      <h2 className="text-lg font-semibold">{userChat?.firstName}</h2>
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className="text-[25px] cursor-pointer">
          <HiDotsVertical />
        </div>
      </Dropdown>
    </div>
  );
};

export default ChatHeader;
