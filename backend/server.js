const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/db');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https'); 

const app = express();

dbConnect();

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'api.ecommerce.test+2-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'api.ecommerce.test+2.pem'))
};

const isProduction = process.env.NODE_ENV === 'production';

// Logic: Use PROD_PORT (5001) for PM2, or PORT (5003) for Nodemon
const PORT = isProduction ? (process.env.PROD_PORT || 5001) : (process.env.PORT || 5003);

const allowedOrigins = [
    process.env.PROD_CLIENT_URL,
    process.env.DEV_CLIENT_URL,
    'https://ecommerce.test',
    'http://localhost:5173',
    'http://localhost:4173',
    'https://api.ecommerce.test',
    'https://api.ecommerce.test:5001',
    'https://api.ecommerce.test:5003'
];

// Add the active dynamic port before initializing CORS
if (!isProduction) {
    allowedOrigins.push(`https://api.ecommerce.test:${PORT}`);
}

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("Blocked by CORS:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'API is running', 
        mode: process.env.NODE_ENV,
        port: PORT 
    });
});

app.use('/api', require('./routes/authRoutes'));

https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`-----------------------------------------------`);
    console.log(`Server Mode: ${process.env.NODE_ENV}`);
    console.log(`Running on: https://api.ecommerce.test:${PORT}`);
    console.log(`-----------------------------------------------`);
});