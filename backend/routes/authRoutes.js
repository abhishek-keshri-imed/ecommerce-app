const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// --- FILE UPLOAD MIDDLEWARE CONFIGURATION ---
const multer = require('multer');
const upload = multer({ 
    dest: 'uploads/', // Temporary storage folder or disk engine destination
    limits: { fileSize: 5 * 1024 * 1024 } // Optional: Enforces 5MB restriction on backend tier too
});

// Public Routes
router.post('/login', authController.login);
router.post('/register',upload.single('profileImage'), authController.register);

// Password Reset Flow
router.post('/forgot-password', authController.forgot_password);
router.post('/reset-password', authController.reset_password);


module.exports = router;