// import { useState } from "react";

// function ChatInterface() {
//   const [userMessage, setUserMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);

//   const sendMessage = () => {
//     if (userMessage.trim() !== "") {
//       // Append user message to chat history
//       setChatHistory([...chatHistory, { sender: "You", message: userMessage }]);

//       // Simulate AI response (replace with actual API call)
//       setChatHistory((prev) => [
//         ...prev,
//         { sender: "AI", message: `You said: ${userMessage}` },
//       ]);

//       setUserMessage(""); // Clear input field
//     }
//   };

//   return (
//     <div className="chat-interface">
//       <h1>Chat Interface</h1>
//       <div className="chat-box">
//         {chatHistory.map((chat, index) => (
//           <p key={index}>
//             <strong>{chat.sender}:</strong> {chat.message}
//           </p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={userMessage}
//         onChange={(e) => setUserMessage(e.target.value)}
//         placeholder="Type your message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default ChatInterface;


import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function ChatInterface() {
  const [userMessage, setUserMessage] = useState(""); // User's typed message
  const [chatHistory, setChatHistory] = useState([]);  // Store conversation history

  const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const request = "(give answer not so detailed, like human, and ask question in return like a human or you can give a random fact)";

  // Send message function
  const sendMessage = async () => {
    if (userMessage.trim() !== "") {
      // Add user message to chat history
      setChatHistory([...chatHistory, { sender: "You", message: userMessage }]);

      // Get AI response
      const response = await model.generateContent(userMessage + request);
      setChatHistory((prev) => [
        ...prev,
        { sender: "AI", message: response.response.text() },
      ]);

      setUserMessage("");  // Clear input field after sending
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
