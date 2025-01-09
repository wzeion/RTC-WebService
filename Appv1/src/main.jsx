// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ChatInterface from './ChatInterface';  // Import the ChatInterface component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Render routes with Router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />         {/* Main page with mic buttons */}
        <Route path="/chat" element={<ChatInterface />} />  {/* Chat page */}
      </Routes>
    </Router>
  </React.StrictMode>
);
