const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Password Reset Flow
router.post('/forgot-password', authController.forgot_password);
router.post('/reset-password', authController.reset_password);

// Private/Protected Route (Only logged-in users can see this)
router.get('/get-user', authMiddleware, (req, res) => {
    // Because of the middleware, we have access to req.id and req.role here
    res.status(200).json({ role: req.role, id: req.id });
});

module.exports = router;