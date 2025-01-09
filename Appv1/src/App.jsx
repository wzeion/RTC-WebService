// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from 'axios';
// import { useState, useEffect } from "react";

// function App() {
//   const [text, setText] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [showChatInterface, setShowChatInterface] = useState(false); // State for chat interface

//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();
//   const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const request = "(give answer not so detailed, like human, and ask question in return like a human or you can give a random fact)";

//   function startListening() {
//     recognition.start();
//   }

//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     console.log(transcript);
//     setText(transcript);
//     generateAnswer(transcript);
//   };

//   async function generateAnswer(question) {
//     const response = await model.generateContent(question + request);
//     console.log(response.response.text());
//     setAnswer(response.response.text());
//     async function Speaking(question) {
//       let utterance = new SpeechSynthesisUtterance(question);
//       utterance.onend = () => {
//         console.log("Speech has stopped.");
//         startListening();
//       };
//       window.speechSynthesis.speak(utterance);
//     }
//     Speaking(response.response.text());
//   }

//   function stopListening() {
//     recognition.abort();
//     window.speechSynthesis.cancel();
//     setShowChatInterface(true); // Show chat interface
//   }

//   return (
//     <>
//       <h1>Chat Bot</h1>
//       {!showChatInterface ? (
//         <>
//           <button onClick={startListening}>Mic On</button>
//           <button onClick={stopListening}>Mic Off</button>
//         </>
//       ) : (
//         <div className="chat-interface">
//           <h2>Chat Interface</h2>
//           <div>
//             <p><strong>You:</strong> {text}</p>
//             <p><strong>Bot:</strong> {answer}</p>
//           </div>
//           <button onClick={() => setShowChatInterface(false)}>Back to Mic</button>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [text, setText] = useState("");  // User's voice input
  const [answer, setAnswer] = useState(""); // Bot's response
  
  const navigate = useNavigate(); // Hook for navigation

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const request = "(give answer not so detailed, like human, and ask question in return like a human or you can give a random fact)";

  // Start listening function
  function startListening() {
    recognition.start();
  }

  // On result, capture the speech and generate AI response
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    setText(transcript);
    generateAnswer(transcript);
  };

  // Function to generate AI answer
  async function generateAnswer(question) {
    const response = await model.generateContent(question + request);
    console.log(response.response.text());
    setAnswer(response.response.text());

    // Speak out the response
    async function speaking(question) {
      let utterance = new SpeechSynthesisUtterance(question);
      utterance.onend = () => {
        console.log("Speech has stopped.");
        startListening();
      };
      window.speechSynthesis.speak(utterance);
    }
    speaking(response.response.text());
  }

  // Stop listening function and navigate to /chat page
  function stopListening() {
    recognition.abort();
    window.speechSynthesis.cancel();
    navigate("/chat"); // Navigate to /chat route
  }

  return (
    <>
      <h1>Chat Bot</h1>
      <button onClick={startListening}>Mic On</button>
      <button onClick={stopListening}>Mic Off</button>
    </>
  );
}

export default App;
