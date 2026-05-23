const express = require('express');
const router = express.Router(); // 👈 Explicitly use Express's router instance
const sellerController = require('../controllers/seller/sellerController');
const authMiddleware = require('../middleware/authMiddleware');

// Grouped cleanly under /api/seller via main server.js
router.get('/get-profile', authMiddleware, sellerController.get_seller_profile);
router.post('/update-profile', authMiddleware, sellerController.update_seller_profile);

module.exports = router;