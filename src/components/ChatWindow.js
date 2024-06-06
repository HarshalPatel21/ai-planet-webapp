import React from "react";
import "../style/ChatWindow.css";

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          <img
            src={
              msg.sender === "user"
                ? "./img/User-icon.png"
                : "./img/small_logo.png"
            }
            alt={msg.sender === "user" ? "User" : "Bot"}
            className="message-icon"
          />
          <span className="message-text">{msg.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
