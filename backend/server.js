const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Import cors
const analyzeRoute = require('./routes/analyzeRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/analyze', analyzeRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
