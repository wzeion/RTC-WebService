import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechTest = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>React Speech Recognition Test</h2>
      <p>Listening: {listening ? "Yes" : "No"}</p>
      <button onClick={SpeechRecognition.startListening({language:"en-IN"})} style={{ margin: "5px" }}>
        Start Listening
      </button>
      <button onClick={SpeechRecognition.stopListening} style={{ margin: "5px" }}>
        Stop Listening
      </button>
      <button onClick={resetTranscript} style={{ margin: "5px" }}>
        Reset Transcript
      </button>
      <p>
        <strong>Transcript:</strong> {transcript}
      </p>
    </div>
  );
};


export default SpeechTest;
