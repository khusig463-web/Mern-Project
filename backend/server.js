require('dotenv').config(); // <-- This MUST be the first line
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const allowedOrigins = [
  'https://mern-project-a2pg.vercel.app',
  'https://mern-project-bu6l.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Compatibility routes for older frontend builds
app.use('/auth', require('./routes/auth'));
app.use('/projects', require('./routes/projects'));
app.use('/tasks', require('./routes/tasks'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("Database Connection Error: ", err));

// Sample Route
app.get('/', (req, res) => res.send('Project Management Tool API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
