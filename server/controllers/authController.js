const User = require("../models/User");
const AppError = require('./../utils/AppError');
const bcrypt = require("bcrypt");

// Register User
exports.registerUser = async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            isAdmin: req.body.isAdmin || false
        })

        await user.save();
        res.status(201).json(user);
    } catch (e) {
        console.log(e);
        next(e)
    }
}

// Login User
exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json({ "Status": "error", "Message": "Account doesn't exist" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        !validPassword && res.status(400).json({ "Status": "error", "Message": "Incorrect Password" });

        res.status(200).json({ "Status": "login Successful", "Data": user })
    } catch (e) {
        console.log(e);
        next(e);
    }
}