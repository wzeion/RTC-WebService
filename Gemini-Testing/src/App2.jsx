
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

import { useState } from "react";

const genAI = new GoogleGenerativeAI("AIzaSyDPh8se8XrI0ap-Kx9XkQCLbQCFYp0v1Jw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

//HAHAHHA
function App2() {
    const [question , setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
  
    async function generateAnswer(){
      const response = await model.generateContent(question)
      console.log(response.response.text());
      setAnswer(response.response.text());
      
    }
    
    return (
      <>
        <h1>
          Chat AI
        </h1>
        <textarea value={question} onChange={(e)=>setQuestion(e.target.value)} cols="30" rows="10"></textarea>
        <button onClick={generateAnswer}>Generate Answer</button>
        <p>AI Answer:{answer}</p>
      </>
    )
}

export default App2;

