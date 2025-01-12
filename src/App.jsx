import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './styles/App.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from './chatHistory';

function App() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [chat, setChat] = useState([]);

  const navigate = useNavigate();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const request = "(give answer not so detailed, like human, and ask question in return like a human. also give unique answers)";

  function startListening() {
    setIsListening(true);
    recognition.start();
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setText(transcript);
    generateAnswer(transcript);
  };

  async function generateAnswer(question) {
    const response = await model.generateContent(question + request);
    const aiAnswer = await response.response.text();
    setAnswer(aiAnswer);
    setChat((prev) => [...prev, { user: question, ai: aiAnswer }]);

    let utterance = new SpeechSynthesisUtterance(aiAnswer);
    utterance.onend = () => startListening();
    window.speechSynthesis.speak(utterance);
  }

  function stopListening() {
    setIsListening(false);
    recognition.abort();
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel();
    navigate("/chat");
  }

  function toggleTranscript() {
    setShowTranscript((prev) => !prev);
  }

  return (
    <div className={`root ${showTranscript ? "with-transcript" : ""}`}>
      <div>
        <ChatHistory />
      </div>
      <div className="chatArea">
        <h1>Chat Bot</h1>
        <div className="button-group">
          <button onClick={startListening} className={`button ${isListening ? "listening" : ""}`}>
            <span className="shadow"></span>
            <span className="edge"></span>
            <div className="front">
              <span>{isListening ? "Listening..." : "Mic On"}</span>
            </div>
          </button>

          <button onClick={stopListening} className="button">
            <span className="shadow"></span>
            <span className="edge"></span>
            <div className="front">
              <span>Mic Off</span>
            </div>
          </button>
        </div>
      </div>
      <button className="transcript-button" onClick={toggleTranscript}>
        {showTranscript ? "Close Transcript" : "Transcript"}
      </button>
      {showTranscript && (
        <div className="transcript">
          {chat.length === 0 ? (
            <p>No conversation yet.</p>
          ) : (
            chat.map((entry, index) => (
              <div key={index} className="chat-entry">
                <p><strong>You:</strong> {entry.user}</p>
                <p><strong>AI:</strong> {entry.ai}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
