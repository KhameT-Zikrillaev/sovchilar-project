import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { MdDeleteOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

const ChatList = ({ messages, user, loading, socket, consId, setMessages }) => {
  const messagesContainerRef = useRef(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isMessageDeleted, setIsMessageDeleted] = useState(false);
  const holdTimeout = useRef(null);
  const {t} = useTranslation()

  

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

  const handleContextMenu = (e, messageId) => {
    e.preventDefault();
    setSelectedMessageId(messageId);
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setIsMenuVisible(true);
  };

  const handleStartHold = (e, messageId) => {
    holdTimeout.current = setTimeout(() => {
      setSelectedMessageId(messageId);
      const x = e.touches ? e.touches[0].clientX - 100: e.clientX - 100;
      const y = e.touches ? e.touches[0].clientY - 100: e.clientY - 100;
      setMenuPosition({ x, y });
      setIsMenuVisible(true);
    }, 500);
  };

  const handleMenuOptionClick = (option) => {
    if (option === "delete") {
      setIsMenuVisible(false);
      setIsModalVisible(true);
    } else {
      console.log(`${option} tanlandi`);
      setIsMenuVisible(false);
    }
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

  const cancelDeleteMessage = () => {
    setSelectedMessageId(null);
    setIsModalVisible(false);
  };

  return (
    <>
      <div
        ref={messagesContainerRef}
        className={`flex flex-col p-4 overflow-y-auto h-full bg-gray-100 ${
          loading ? "justify-center items-center" : ""
        }`}
        onClick={() => setIsMenuVisible(false)}
      >
        {loading ? (
          <div className="loader"></div>
        ) : (
          messages?.map((msg, index) => (
            <div
              key={index}
              style={{
                borderRadius:
                  msg?.sender?.id !== user?.id
                    ? "20px 20px 20px 0"
                    : "20px 20px 0 20px",
              }}
              className={`my-2 p-3 pb-[14px] bg-white border rounded-lg max-w-xs min-w-[100px] relative break-words overflow-clip ${
                msg?.sender?.id === user?.id
                  ? " self-end border-red-500"
                  : " self-start border-gray-300"
              }`}
              onContextMenu={(e) =>
                msg?.sender?.id === user?.id && handleContextMenu(e, msg?.id)
              }
              onMouseDown={(e) =>
                msg?.sender?.id === user?.id && handleStartHold(e, msg?.id)
              }
              onTouchStart={(e) =>
                msg?.sender?.id === user?.id && handleStartHold(e, msg?.id)
              }
            >
              <span>{msg?.message}</span>
              <span className="absolute right-[4px] bottom-[2px] text-[12px] text-gray-600">
                {getHoursAndMinutesString(msg?.createdAt)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Context Menu */}
      {isMenuVisible && (
        <div
          style={{
            position: "absolute",
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
            zIndex: 1000,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ul>
            <li
              onClick={() => handleMenuOptionClick("delete")}
              className="p-2 hover:bg-gray-100 cursor-pointer text-red-600 font-medium flex items-center gap-1"
            >
              {t("chat.message-delete")} <MdDeleteOutline className="text-[20px]" />
            </li>
            <li
              onClick={() => handleMenuOptionClick("edit")}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              Tahrirlash
            </li>
            <li
              onClick={() => handleMenuOptionClick("select")}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              Select
            </li>
          </ul>
        </div>
      )}

      {/* Modal oyna */}
      <Modal
        title="Xabarni o'chirish"
        open={isModalVisible}
        onOk={handleDeleteMessage}
        onCancel={cancelDeleteMessage}
        okText="O'chirish"
        cancelText="Bekor qilish"
        okButtonProps={{ style: { backgroundColor: "#DC2626", borderColor: "#DC2626" } }}
      >
        <p>Ushbu xabarni o‘chirishni xohlaysizmi?</p>
      </Modal>
    </>
  );
};

export default ChatList;
