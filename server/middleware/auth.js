const jwt = require("jsonwebtoken");

module.exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return next(res.send('Authentication Invalid'));
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        next();
    } catch (err) {
        console.error(err);
        if (err.name === 'TokenExpiredError') {
            // Handle expired token error
            res.status(401).json({ error: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            // Handle invalid token error
            res.status(401).json({ error: 'Invalid token' });
        } else {
            // Handle other errors
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
