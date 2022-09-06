const jwt = require('jsonwebtoken');
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token
            token = req.headers.authorization.split(' ')[1]

            // verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not Authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, no token');
    }
}

module.exports = protect