
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import SpeechToText from "./STT";

import { useState } from "react";

const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

function GemAns() {
    const [question , setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    setQuestion(SpeechToText);
    async function generateAnswer(){
      const response = await model.generateContent(question)
      console.log(response.response.text());
      setAnswer(response.response.text());
      
    }

    async function Speaking(){
      let utterance = new SpeechSynthesisUtterance(answer);
      window.speechSynthesis.speak(utterance);
    }
    
    return answer;
}

export default GemAns;

