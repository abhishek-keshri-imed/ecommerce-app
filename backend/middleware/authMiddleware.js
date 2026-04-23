const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    // 1. Extract the token from cookies (Ensure cookie-parser is used in server.js)
    const { accessToken } = req.cookies;

    // 2. Guard Clause
    if (!accessToken) {
        return res.status(401).json({ error: 'Please Login First' });
    }

    try {
        // 3. Verify AND Decode in one step
        // jwt.verify checks if the token was tampered with using your secret
        const deCodeToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        
        // 4. Attach data to the request object
        req.role = deCodeToken.role;
        req.id = deCodeToken.id;
        
        next();
    } catch (error) {
        // 5. Handle expired or invalid tokens
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ error: 'Session Expired or Invalid' });
    }
};

module.exports = authMiddleware;