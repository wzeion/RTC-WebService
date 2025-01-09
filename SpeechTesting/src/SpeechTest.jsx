import React, { useState, useEffect } from "react";

const SpeechTest = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Create SpeechRecognition instance
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  useEffect(() => {
    // Configure recognition settings
    recognition.interimResults = true;
    recognition.continuous = true;

    // Handle recognition results
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join("");
      setText(transcript);
    };

    // Handle recognition errors or stopping
    recognition.onend = () => {
      if (isListening) {
        recognition.start(); // Restart listening if stopped unintentionally
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    // Cleanup on component unmount
    return () => {
      recognition.stop();
    };
  }, [isListening, recognition]);

  const handleOnRecord = () => {
    if (!isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  const resetTranscript = () => {
    setText("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>React Speech Recognition Test</h2>
      <button
        onClick={handleOnRecord}
        style={{ margin: "5px" }}
        disabled={isListening}
      >
        Start Listening
      </button>
      <button
        onClick={stopListening}
        style={{ margin: "5px" }}
        disabled={!isListening}
      >
        Stop Listening
      </button>
      <button onClick={resetTranscript} style={{ margin: "5px" }}>
        Reset Transcript
      </button>
      <p>Your Speech: {text}</p>
    </div>
  );
};

export default SpeechTest;
