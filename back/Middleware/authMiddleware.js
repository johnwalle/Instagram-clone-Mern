const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from the authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get the user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not authorized' });

            // throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
      
        // throw new Error('Not authorized, no token');
    }
};

module.exports = { authMiddleware };