const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/db');
require('dotenv').config();

const app = express();

// 1. Dynamic Environment Logic
const isProduction = process.env.NODE_ENV === 'production';
const frontendURL = isProduction 
    ? ['https://ecommerce.test', 'https://api.ecommerce.test:444'] // Allow the dashboard and the API's own origin
    : 'http://localhost:5173';

// 2. Middleware
app.use(cors({
    origin: frontendURL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// DB Connection
dbConnect();

// 3. Health Check (Crucial for IIS/Reverse Proxy testing)
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'API is running', mode: process.env.NODE_ENV });
});

// Routes
app.use('/api', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});