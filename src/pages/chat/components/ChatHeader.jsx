import { Dropdown, Menu } from "antd";
import { useCallback } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { GrFormPreviousLink } from "react-icons/gr";
import { useChatStore } from "../../../store/chatStore";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

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
  const {removeUserChat} = useChatStore()
  const navigate = useNavigate()

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
        removeUserChat()
        setActiveUser(null);
        setConsId(null);
        setMessages([]);
        setShowChat(false);
      }
    },
    [socket]
  );

  const handleDetailsClick = () => {
    // Сохраняем id карточки и дефолтное изображение
    // localStorage.setItem("lastViewedCardId", userChat?.id.toString());
    // localStorage.setItem("defaultUserImage", userChat?.imageUrl || defaultImage);
    // Переходим на страницу деталей
    navigate(`/user/${userChat?.id}`);
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="delete"
        onClick={() => deleteConversation(consId, userChat?.id)}
      >
        <div className="flex items-center gap-1 text-[16px] text-red-600">
        <MdDeleteOutline className="text-[20px]" />
          {t("chat.chat-delete")}
          
        </div>
      </Menu.Item>
      <Menu.Item
        key="profile"
        onClick={handleDetailsClick}
      >
        <div className="flex items-center gap-1 text-[16px] text-sky-600">
        <FaRegUser className="text-[20px]" />{t("chat.profile")}
          
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
          removeUserChat()
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
