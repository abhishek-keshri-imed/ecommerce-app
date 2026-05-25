const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    // 1. Extract from cookies OR fallback to the Authorization header
    const cookieToken = req.cookies?.accessToken;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const headerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    const token = cookieToken || headerToken;

    // 2. Guard Clause
    if (!token) {
        return res.status(401).json({ error: 'Please Login First' });
    }

    try {
        // 3. Verify AND Decode using your JWT_SECRET
        const deCodeToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Attach data cleanly to the request object
        req.role = deCodeToken.role;
        req.id = deCodeToken.id;
        req.userId = deCodeToken.id; // ✨ FIXED: Injects req.userId so your categoryController can read it!
        
        next();
    } catch (error) {
        // 5. Handle expired or invalid tokens
        return res.status(401).json({ error: 'Session Expired or Invalid' });
    }
};

module.exports = authMiddleware;