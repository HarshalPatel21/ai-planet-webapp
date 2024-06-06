import React, { useEffect, useState } from "react";
import "../style/MainContent.css";
import FileInput from "./FileInput";
import { postFile, postQuestion } from "../services/fileUpload.service";
import ChatWindow from "./ChatWindow";
import "react-circular-progressbar/dist/styles.css";
import { DotLoader, PuffLoader } from "react-spinners";

const MainContent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleFileSelected = async (selectedFile) => {
    let response = await postFile(selectedFile);
    setIsSuccess(response.success);
  };

  const handleInputChange = (e) => {
    // to continuously change input-bar
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // if file-upload is successful
    if (isSuccess) {
      const newMessages = [
        ...messages,
        { text: "File Upload successful!", sender: "bot" },
      ];
      setMessages(newMessages);
      setIsSuccess(false);
    }
  }, [isSuccess]);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      // empty the inputbox and set loading
      setInputValue("");
      setIsLoading(true);
      const newMessages = [...messages, { text: inputValue, sender: "user" }];
      setMessages(newMessages);
      let response = await postQuestion(inputValue);
      if (response.success) {
        const botResponse = response.result.answer;
        const newBotMessage = { text: botResponse, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      } else {
        const newBotMessage = { text: "Please Upload a file", sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="content-header">
        <img src="./img/AI_Planet_Logo.png" alt="Logo" className="logo" />
        <FileInput onFileSelected={handleFileSelected} />
      </div>
      <div className="content-body">
        <ChatWindow messages={messages} />
        {isLoading && (
          <div className="loader">
            <PuffLoader animation="border" color="#25A35A" size={50} />
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          disabled={isLoading}
          type="text"
          className="chat-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message and press Enter"
        />
      </div>
    </div>
  );
};

export default MainContent;
