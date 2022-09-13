const jwt = require('jsonwebtoken');
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token
            token = req.headers.authorization.split(' ')[1]

            // verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
                if (error) {
                    return res.status(403).json({ "message": "Invalid Token" })
                }
            });

            // get user
            req.user = await User.findById(decoded.id).select('-password');

            next();
            return
        } catch (error) {
            console.log(error);
          return res.status(401).json({ message: "Not Authorized, Invalid token" });
            // throw new Error("Not Authorized")
        }
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized Access, No Token" })
        // throw new Error('Not Authorized, no token');
    }
}

module.exports = protect