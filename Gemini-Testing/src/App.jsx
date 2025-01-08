import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  async function generateAnswer(){
    const response = await axios({
      url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAiWHaxNnKZWDsIyhiRBQhasmh2F46AlX0",
      method: "post",
      data: {
        contents: [{
          parts:[{text: "Hello AI!"}]
          }]
         }
    })
    console.log(response)
  }

  return (
    <>
      <h1>
        Chat AI
      </h1>
      <button onClick={generateAnswer}>Generate Answer</button>
    </>
  )
}

export default App
