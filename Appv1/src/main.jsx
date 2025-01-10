import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import ChatInterface from './ChatInterface';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />         {}
        <Route path="/chat" element={<ChatInterface />} />  {}
      </Routes>
    </Router>
  </React.StrictMode>
);
