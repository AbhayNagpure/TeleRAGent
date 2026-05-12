const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Simulate a delay and a simple bot response
  setTimeout(() => {
    let reply = `I received your message: "${userMessage}". This is a simulated backend response!`;

    // Add some simple logic for demo purposes
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      reply = "Hello there! How can I assist you further?";
    } else if (lowerMsg.includes('help')) {
      reply = "I'm here to help. Could you provide more details about what you need assistance with?";
    } else if (lowerMsg.includes('weather')) {
      reply = "I'm a simple AI without internet access right now, so I can't check the weather. Sorry!";
    }

    res.json({ reply });
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
