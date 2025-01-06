import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SpeechTest from "./SpeechTest";
import "regenerator-runtime/runtime";
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
