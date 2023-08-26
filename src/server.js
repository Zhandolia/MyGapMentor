// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// const port = process.env.PORT || 3001;

// app.use(express.json());

// app.post('/api/generate-text', async (req, res) => {
//   try {
//         const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
//     prompt: req.body.prompt,
//     max_tokens: 50,
//     }, {
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
//     }
//     });

//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
