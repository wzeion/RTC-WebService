require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const Message = require('./models/Message');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// API Key and AI Model
const API_KEY = process.env.GOOGLE_AI_API_KEY;
const BASE_URL = "https://generativeai.googleapis.com/v1beta2/models/gemini-1.5-flash:generateText";

// Route: Handle chat messages
app.post('/api/chat', async (req, res) => {
  const { userMessage } = req.body;

  try {
    // Save user message to MongoDB
    const userMsg = new Message({ role: 'User', text: userMessage });
    await userMsg.save();

    // Request AI-generated response
    const aiResponse = await axios.post(
      BASE_URL,
      { prompt: `${userMessage} (concise, engaging response with follow-up)` },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const botMessage = aiResponse.data.generations[0].text;

    // Save bot response to MongoDB
    const botMsg = new Message({ role: 'Bot', text: botMessage });
    await botMsg.save();

    // Retrieve conversation history
    const conversationHistory = await Message.find().sort({ timestamp: 1 });

    res.json({ botMessage, conversationHistory });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).send("Error generating AI response");
  }
});

// Route: Clear conversation history
app.post('/api/clear', async (req, res) => {
  try {
    await Message.deleteMany({});
    res.send("Conversation history cleared");
  } catch (error) {
    console.error("Error clearing history:", error);
    res.status(500).send("Error clearing history");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
