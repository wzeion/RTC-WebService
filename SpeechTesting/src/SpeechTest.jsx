import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState } from "react";

const SpeechTest = () => {
  const [text, setText] = useState("");
  function handleOnRecord(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = async function (event){
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    }

    recognition.start();
  }
  
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>React Speech Recognition Test</h2>
      <button onClick={handleOnRecord} style={{ margin: "5px" }}>
        Start Listening
      </button>
      <button style={{ margin: "5px" }}>
        Stop Listening
      </button>
      <button style={{ margin: "5px" }}>
        Reset Transcript
      </button>
      <p>Your Speech: {text}</p>
    </div>
  );
};


export default SpeechTest;
