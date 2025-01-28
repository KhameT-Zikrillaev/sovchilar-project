import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SendMessage = ({ socket, user, consId }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() && socket && consId) {
      socket.emit("sendMessage", {
        senderId: user?.id,
        conversationId: consId,
        message: input,
      });
      setInput("");
    }
  };

  return (
    <div className="flex p-2 bg-white border-t border-gray-300">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t("chat.type-message")}
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
        {t("chat.send-btn")}
      </button>
    </div>
  );
};

export default SendMessage;
