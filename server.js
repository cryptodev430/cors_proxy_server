const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY ;
const authToken = `Bearer ${API_KEY}`;

app.get('/', async (req, res) => {
  try {
    const query = decodeURIComponent(req._parsedUrl.query);
    const response = await fetch(query, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': authToken,
      },
    });
    
    const data = await response.json();
    console.log("data", data);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});