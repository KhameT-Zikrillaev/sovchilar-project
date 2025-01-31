import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { HiDotsVertical } from "react-icons/hi";
import { Dropdown, Menu } from "antd";

const ChatList = ({ messages, user, loading, socket, consId, setMessages }) => {
  const messagesContainerRef = useRef(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isMessageDeleted, setIsMessageDeleted] = useState(false);
  const { t } = useTranslation();

  


  useEffect(() => {
    if (!isMessageDeleted) {
      scrollToBottom();
    }
  }, [messages, isMessageDeleted]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const getHoursAndMinutesString = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleDeleteMessage = () => {
    if (selectedMessageId) {
      socket.emit("deleteMessages", {
        messageIds: [selectedMessageId],
        userId: user?.id,
        conversationId: consId,
      });
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== selectedMessageId)
      );
      setIsModalVisible(false);
      setIsMessageDeleted(true); // Xabar o'chirildi deb belgilash
    }
  };

  const handleMenuOptionClick = (option, id) => {
    setSelectedMessageId(id);
    if (option === "delete") {
      setIsMenuVisible(false);
      setIsModalVisible(true);
    } else {
      console.log(`${option} tanlandi`);
      setIsMenuVisible(false);
    }
  };

  const cancelDeleteMessage = () =>  { 
    setIsModalVisible(false);
  }

  return (
    <>
      <div
        ref={messagesContainerRef}
        className={`flex flex-col p-4 overflow-y-auto h-full scroll-smooth relative chat-ios-scroll  ${
          loading
            ? "justify-center items-center"
            : messages?.length === 0
            ? "justify-center items-center"
            : ""
        }`}
        style={{
          WebkitOverflowScrolling: "touch",
          maxWidth: "100vw",
        }}
        onClick={() => setIsMenuVisible(false)}
      >
        {loading ? (
          <div className="loader"></div>
        ) : messages?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-center bg-red-100/50 rounded-lg p-6 backdrop-blur-md shadow-lg">
            <p className="text-lg font-semibold text-red-600 drop-shadow-md">
              📩 {t("chat.not-message-1")}
            </p>
            <p className="text-sm text-red-500 mt-2 drop-shadow-md max-w-[260px]">
              {t("chat.not-message-2")}
            </p>
          </div>
        ) : (
          messages?.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-3 pr-[30px] pb-[16px] bg-white border rounded-lg max-w-[85%] min-w-[100px] relative break-words  ${
                msg?.sender?.id === user?.id
                  ? "self-end border-red-500"
                  : "self-start border-gray-300"
              }`}
              style={{
                wordBreak: "break-word",
                borderBottomLeftRadius:
                  msg?.sender?.id !== user?.id ? "4px" : "20px",
                borderBottomRightRadius:
                  msg?.sender?.id === user?.id ? "4px" : "20px",
              }}
              
            >
              <span className="whitespace-pre-wrap">{msg?.message}</span>
              <span className="absolute right-1 bottom-5 text-gray-600">
                <Dropdown overlay={
                  <Menu>
                  <Menu.Item
                    key="delete"
                    onClick={() => handleMenuOptionClick("delete", msg?.id)}
                  >
                    <div className="flex items-center gap-1 text-[16px] text-red-600">
                      <MdDeleteOutline className="text-[20px]" />
                      {t("chat.delete-modal.ok")}
                    </div>
                  </Menu.Item>
                </Menu>
                } trigger={["click"]}>
                  <div className="text-[22px] cursor-pointer">
                    <HiDotsVertical />
                  </div>
                </Dropdown>
              </span>
              <span className="absolute right-[4px] bottom-[2px] text-[12px] text-gray-600">
                {getHoursAndMinutesString(msg?.createdAt)}
              </span>
            </div>
          ))
        )}
      </div>
      {/* Modal oyna */}
      <Modal
        centered
        title={t("chat.delete-modal.title")}
        open={isModalVisible}
        onOk={handleDeleteMessage}
        onCancel={cancelDeleteMessage}
        okText={t("chat.delete-modal.ok")}
        cancelText={t("chat.delete-modal.cancel")}
        width={300}
        okButtonProps={{
          style: { backgroundColor: "#DC2626", borderColor: "#DC2626" },
        }}
      >
        <p>{t("chat.delete-modal.want-delete")}</p>
      </Modal>
    </>
  );
};

export default ChatList;
