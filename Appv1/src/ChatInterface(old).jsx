import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './styles/ChatInterface.css';
import chatHistory from "./chatHistory";

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
    <div>
      <chatHistory/>
    </div>
    <div className="chat-interface">
      <h1>Chat Interface</h1>
      <div className="chat-box">
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
      <div className="input-section">
        <div class="textInputWrapper">
          <input 
            placeholder="Type your message..." 
            type="text" 
            class="textInput"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
      
    </div>
    </div>
  );
}

export default ChatInterface;