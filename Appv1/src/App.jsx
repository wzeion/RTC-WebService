import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './styles/App.css'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from './chatHistory';

function App() {
  const [text, setText] = useState(""); 
  const [answer, setAnswer] = useState(""); 
  
  const navigate = useNavigate();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const request = "(give answer not so detailed, like human, and ask question in return like a human. also give unique answers)";

  function startListening() {
    recognition.start();
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    setText(transcript);
    generateAnswer(transcript);
  };

  async function generateAnswer(question) {
    const response = await model.generateContent(question + request);
    console.log(response.response.text());
    setAnswer(response.response.text());

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

  function stopListening() {
    recognition.abort();
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel();
    navigate("/chat"); 
  }

  return (
    <>  <div>
          <ChatHistory/>
        </div>
        <div className='chatArea'>
          <h1>Chat Bot</h1>
          <button onClick={startListening} class="button">
            <span className="shadow"></span>
            <span className="edge"></span>
            <div className="front">
              <span>Mic On</span>
            </div>
          </button>

          <button onClick={stopListening} class="button">
            <span className="shadow"></span>
            <span className="edge"></span>
            <div className="front">
              <span>Mic Off</span>
            </div>
          </button>
        </div>
    </>
  );
}

export default App;




