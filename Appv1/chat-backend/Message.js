const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema({
  role: { 
    type: String, 
    required: true, 
    enum: ['User', 'Bot']  // Limit to "User" or "Bot" roles
  },
  text: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

// Export the Message model
module.exports = mongoose.model('Message', messageSchema);
