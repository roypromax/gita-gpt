const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.post('/api/quote', async (req, res) => {
  try {
    const { input } = req.body;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages: [{ role: 'system', content: 'You are a user requesting Gita quotes.' }, { role: 'user', content: input }],
      model: 'gpt-3.5-turbo',
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const quote = response.data.choices[0].message.content;

    res.json({ quote });
  } catch (error) {
    console.error('Error generating quote:', error);
    res.status(500).json({ error: 'Failed to generate quote' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
