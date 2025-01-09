import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function ChatInterface() {
  const [userMessage, setUserMessage] = useState(""); 
  const [chatHistory, setChatHistory] = useState([]);  

  const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const request = "(give answer not so detailed, like human, and ask question in return like a human or you can give a random fact)";


  const sendMessage = async () => {
    if (userMessage.trim() !== "") {
   
      setChatHistory([...chatHistory, { sender: "You", message: userMessage }]);


      const response = await model.generateContent(userMessage + request);
      setChatHistory((prev) => [
        ...prev,
        { sender: "AI", message: response.response.text() },
      ]);

      setUserMessage("");  
    }
  };

  return (
    <div className="chat-interface">
      <h1>Chat Interface</h1>
      <div className="chat-box">
        {chatHistory.map((chat, index) => (
          <p key={index}>
            <strong>{chat.sender}:</strong> {chat.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatInterface;
