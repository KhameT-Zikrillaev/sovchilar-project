import React, { useCallback, useState } from "react";

const SendMessage = ({ socket, user, consId }) => {
  const [input, setInput] = useState("");

  const sendMessage = useCallback(() => {
    if (input.trim() && socket && consId) {
      socket.emit("sendMessage", {
        senderId: user?.id,
        conversationId: consId,
        message: input,
      });
      setInput("");
    }
  }, [input, socket, consId, user]);

  return (
    <div className="flex p-2 bg-white border-t border-gray-300">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
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
        Send
      </button>
    </div>
  );
};

export default SendMessage;
