import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';
import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const request = "(give answer not so detailed, like human, and ask question in return like a human or you can give a random fact)";

  function startListening(){
    recognition.start();
  }
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    setText(transcript);
    generateAnswer(transcript);
    
  }
  async function generateAnswer(question){
    const response = await model.generateContent(question+request)
    console.log(response.response.text());
    setAnswer(response.response.text());
    async function Speaking(question){
      let utterance = new SpeechSynthesisUtterance(question);
      utterance.onend = () => {
        console.log("Speech has stopped.");
        startListening();
      };
      window.speechSynthesis.speak(utterance);
    }
    Speaking(response.response.text());

    
  }
  function stopListening(){
    recognition.abort();
    window.speechSynthesis.cancel();
  }
  
  return (
    <>
      <h1>Chat Bot</h1>
      <button
        onClick={startListening}>Mic On</button>
      <button
        onClick={stopListening}>Mic Off</button>
    </>
  )
}

export default App
