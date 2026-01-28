const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    // 1. Extract the token from the browser cookies
    const { accessToken } = req.cookies;

    // 2. Check if the token exists
    if (!accessToken) {
        return res.status(401).json({ error: 'Please Login First' });
    } else {
        try {
            // 3. Verify the token using your secret random key
            const deCodeToken = await jwt.verify(accessToken, process.env.JWT_SECRET);
            
            // 4. Attach user details to the request object so controllers can use them
            req.role = deCodeToken.role;
            req.id = deCodeToken.id;
            
            // 5. Move to the next function (the Controller)
            next();
        } catch (error) {
            // If the token is fake or expired
            return res.status(401).json({ error: 'Session Expired' });
        }
    }
};

module.exports = authMiddleware;