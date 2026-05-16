// backend/routes/adminRoutes.js
const router = require('express').Router();
const sellerController = require('../controllers/admin/sellerController');
const authMiddleware = require('../middleware/authMiddleware');

// Simple Role Guard: Only allows users with the 'admin' role to proceed
const adminGuard = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ error: "Access Denied: Admin privileges required" });
    }
    next();
};

// Apply authMiddleware first, then adminGuard
router.get('/get-seller-request', authMiddleware, adminGuard, sellerController.request_get_seller);
router.get('/get-seller/:sellerId', authMiddleware, adminGuard, sellerController.get_seller);
router.post('/seller-status-update', authMiddleware, adminGuard, sellerController.seller_status_update);

module.exports = router;