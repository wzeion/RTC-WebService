// // import { useState } from "react";
// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // import './ChatInterface.css'; // You can create a CSS file for custom styles

// // function ChatInterface() {
// //   const [userMessage, setUserMessage] = useState(""); // User's typed message
// //   const [chatHistory, setChatHistory] = useState([]);  // Store conversation history

// //   const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
// //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// //   const request = "(give answer not so detailed, like human, and ask question in return like a human or you can give a random fact)";

// //   // Send message function
// //   const sendMessage = async () => {
// //     if (userMessage.trim() !== "") {
// //       // Add user message to chat history
// //       setChatHistory([...chatHistory, { sender: "You", message: userMessage }]);

// //       // Get AI response
// //       const response = await model.generateContent(userMessage + request);
// //       setChatHistory((prev) => [
// //         ...prev,
// //         { sender: "AI", message: response.response.text() },
// //       ]);

// //       setUserMessage("");  // Clear input field after sending
// //     }
// //   };

// //   return (
// //     <div className="chat-interface">
// //       <h1>Chat Interface</h1>
// //       <div className="chat-box">
// //         {chatHistory.map((chat, index) => (
// //           <div
// //             key={index}
// //             className={`chat-message ${chat.sender === "You" ? "user-message" : "ai-message"}`}
// //           >
// //             <strong>{chat.sender}:</strong> {chat.message}
// //           </div>
// //         ))}
// //       </div>
// //       <div className="input-section">
// //         <input
// //           type="text"
// //           className="message-input"
// //           value={userMessage}
// //           onChange={(e) => setUserMessage(e.target.value)}
// //           placeholder="Type your message..."
// //         />
// //         <button onClick={sendMessage} className="send-button">Send</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ChatInterface;







// import { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import './ChatInterface.css'; 

// function ChatInterface() {
//   const [userMessage, setUserMessage] = useState(""); 
//   const [chatHistory, setChatHistory] = useState([]);  

//   const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const request = "(give answer not so detailed, like human, and ask question in return like a human or you can give a random fact)";


//   const sendMessage = async () => {
//     if (userMessage.trim() !== "") {

//       setChatHistory([...chatHistory, { sender: "You", message: userMessage }]);

  
//       const response = await model.generateContent(userMessage + request);
//       setChatHistory((prev) => [
//         ...prev,
//         { sender: "AI", message: response.response.text() },
//       ]);

//       setUserMessage("");  
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendMessage(); 
//     }
//   };

//   return (
//     <div className="chat-interface">
//       <h1>Chat Interface</h1>
//       <div className="chat-box">
//         {chatHistory.map((chat, index) => (
//           <div
//             key={index}
//             className={`chat-message ${chat.sender === "You" ? "user-message" : "ai-message"}`}
//           >
//             <strong>{chat.sender}:</strong> {chat.message}
//           </div>
//         ))}
//       </div>
//       <div className="input-section">
//         <input
//           type="text"
//           className="message-input"
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.target.value)}
//           onKeyPress={handleKeyPress} 
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage} className="send-button">Send</button>
//       </div>
//     </div>
//   );
// }

// export default ChatInterface;


import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './ChatInterface.css';

function ChatInterface() {
  const [userMessage, setUserMessage] = useState(""); // User's typed message
  const [chatHistory, setChatHistory] = useState([]);  // Store conversation history
  const [isGenerating, setIsGenerating] = useState(false); // Track AI response generation

  const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const request = "(give answer not so detailed, like human, and ask question in return like a human or you can give a random fact)";

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
        <input
          type="text"
          className="message-input"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
