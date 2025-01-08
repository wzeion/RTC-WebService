import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  async function Speaking(){
    let utterance = new SpeechSynthesisUtterance('Hello Guys!');
    window.speechSynthesis.speak(utterance);
  }

  return (
    <>
    <h1>Hey!</h1>
    <button onClick={Speaking}>Hey Guys!</button>
    </>
  )
}

export default App
