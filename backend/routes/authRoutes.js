const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Password Reset Flow
router.post('/forgot-password', authController.forgot_password);
router.post('/reset-password', authController.reset_password);


module.exports = router;