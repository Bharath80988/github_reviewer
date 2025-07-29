const express = require('express');
const dotenv = require('dotenv');
const analyzeRoute = require('./routes/analyzeRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Route
app.use('/analyze', analyzeRoute);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
