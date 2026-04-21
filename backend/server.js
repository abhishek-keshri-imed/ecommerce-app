const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/db');
require('dotenv').config();

const app = express();

// DB Connection
dbConnect();

// 2. CORS CONFIGURATION
// We allow both your local dev environment and your production domain
const allowedOrigins = [
    'https://ecommerce.test',      // Your Production Domain
    'http://localhost:5173',       // Your Vite Dev Server
    'http://localhost:4173',       // Your Vite Preview Port
    'https://api.ecommerce.test:444' 
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Crucial for Auth Cookies/Tokens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Middleware
app.use(express.json());
app.use(cookieParser());



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