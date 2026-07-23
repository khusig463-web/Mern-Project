require('dotenv').config(); // <-- This MUST be the first line
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_URL
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects')); // <-- Yeh naya add kiya
app.use('/api/tasks', require('./routes/tasks'));       // <-- Yeh naya add kiya

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("Database Connection Error: ", err));

// Sample Route
app.get('/', (req, res) => res.send('Project Management Tool API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
