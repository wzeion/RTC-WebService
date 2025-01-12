// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './styles/App.css'
// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ChatHistory from './chatHistory';

// function App() {
//   const [text, setText] = useState(""); 
//   const [answer, setAnswer] = useState(""); 
  
//   const navigate = useNavigate();

//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();
//   const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const request = "(give answer not so detailed, like human, and ask question in return like a human. also give unique answers)";

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

//     async function speaking(question) {
//       let utterance = new SpeechSynthesisUtterance(question);
//       utterance.onend = () => {
//         console.log("Speech has stopped.");
//         startListening();
//       };
//       window.speechSynthesis.speak(utterance);
//     }
//     speaking(response.response.text());
//   }

//   function stopListening() {
//     recognition.abort();
//     window.speechSynthesis.pause();
//     window.speechSynthesis.cancel();
//     navigate("/chat"); 
//   }

//   return (
//         <div className='root'>  
//         <div>
//           <ChatHistory/>
//         </div>
//         <div className='chatArea'>
//     <h1>Chat Bot</h1>
//     <div className="button-group">
//       <button onClick={startListening} className="button">
//         <span className="shadow"></span>
//         <span className="edge"></span>
//         <div className="front">
//           <span>Mic On</span>
//         </div>
//       </button>

//       <button onClick={stopListening} className="button">
//         <span className="shadow"></span>
//         <span className="edge"></span>
//         <div className="front">
//           <span>Mic Off</span>
//         </div>
//       </button>
//     </div>
//   </div>
// </div>
//   );
// }

// export default App;







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

  const navigate = useNavigate();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const request = "(give answer not so detailed, like human, and ask question in return like a human. also give unique answers)";

  function startListening() {
    setIsListening(true);  // Start listening animation
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
    setIsListening(false);  // Stop listening animation
    recognition.abort();
    window.speechSynthesis.pause();
    window.speechSynthesis.cancel();
    navigate("/chat");
  }

  return (
    <div className='root'>
      <div>
        <ChatHistory />
      </div>
      <div className='chatArea'>
        <h1>Chat Bot</h1>
        <div className="button-group">
          <button 
            onClick={startListening} 
            className={`button ${isListening ? "listening" : ""}`}>
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
    </div>
  );
}

export default App;
