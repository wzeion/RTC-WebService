import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './styles/ChatInterface.css';
import ChatHistory from "./chatHistory";

function ChatInterface() {
  const [userMessage, setUserMessage] = useState(""); // User's typed message
  const [chatHistory, setChatHistory] = useState([]);  // Store conversation history
  const [isGenerating, setIsGenerating] = useState(false); // Track AI response generation

  const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const request = "(give answer not so detailed, like human, and ask question in return like a human. also give unique answers)";

  // Send message function
  const sendMessage = async () => {
    if (userMessage.trim() !== "") {
      setChatHistory([...chatHistory, { sender: "You", message: userMessage }]);
      setUserMessage("");  // Clear input field
      setIsGenerating(true); // Show loading animation
      
      // Get AI response
      const response = await model.generateContent(userMessage + request);
      setIsGenerating(false); // Hide loading animation
      
      setChatHistory((prev) => [
        ...prev,
        { sender: "AI", message: response.response.text() },
      ]);
    }
  };

  // Handle Enter key press to send the message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div> 
    <ChatHistory/>
    <div class="chatInterface">
    <h1 class="chatTitle" id="chatTitle">Select a Chat</h1>
    <div id="chatContent">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat-message ${chat.sender === "You" ? "user-message" : "ai-message"}`}
          >
            <strong>{chat.sender}:</strong> {chat.message}
          </div>
        ))}
        {isGenerating && (
          <div className="chat-message ai-message">
            <strong>AI:</strong>
            <span className="loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}
    </div>
    <div class="messageInput">
      <div class="form-control">
        <input 
            class="input input-alt" 
            placeholder="Type something here..." 
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyPress}/>
        <span class="input-border input-border-alt"></span>
      </div>
      <button class="Send" onclick={sendMessage}>
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span>Send</span>
      </button>
    </div>
  </div>
  </div>
  );
}

export default ChatInterface;
