const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/db');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https'); 
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes'); 
const sellerRoutes = require('./routes/sellerRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes');  

const app = express();

// Database Connection
dbConnect();

// SSL Certificates for HTTPS
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'api.ecommerce.test+2-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'api.ecommerce.test+2.pem'))
};

const isProduction = process.env.NODE_ENV === 'production';

// Port Logic
const PORT = isProduction ? (process.env.PROD_PORT || 5001) : (process.env.PORT || 5003);

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This allows the frontend to fetch static profile pictures directly via network requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS Configuration
const allowedOrigins = [
    process.env.PROD_CLIENT_URL,
    process.env.DEV_CLIENT_URL,
    'https://ecommerce.test',
    'http://localhost:5173',
    'https://localhost:5173',
    'https://ecommerce.test:5174',
    'http://localhost:4173',
    'https://api.ecommerce.test',
    'https://api.ecommerce.test:5001',
    'https://localhost:5174',
    'https://api.ecommerce.test:5003'
];

if (!isProduction) {
    allowedOrigins.push(`https://api.ecommerce.test:${PORT}`);
}

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'accessToken','Cache-Control', 'Pragma', 'Expires'] // Added accessToken and cache headers
}));

// Debugging: Log incoming cookies to terminal
app.use((req, res, next) => {
  if (!isProduction) {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  }
  next();
});

// Routes
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'API is running', 
        mode: process.env.NODE_ENV,
        port: PORT 
    });
});

app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api', categoryRoutes);

// HTTPS Server Initialization
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`-----------------------------------------------`);
    console.log(`Server Mode: ${process.env.NODE_ENV}`);
    console.log(`Running on: https://api.ecommerce.test:${PORT}`);
    console.log(`-----------------------------------------------`);
});