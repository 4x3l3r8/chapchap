const User = require("../models/User");
const AppError = require('./../utils/AppError');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require('../utils/tokenGenerator');

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

        // await user.save();
        if (await user.save()) {
            res.status(201).json({
                _id: user.id,
                email: user.email,
                username: user.username,
                token: generateToken(user.id)
            });
        } else {
            res.status(400)
            throw new Error('Invalid Request')
        }
    } catch (e) {
        console.log(e);
        next(e)
    }
}

// @desc  Login User
exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json({ "Status": "error", "Message": "Account doesn't exist" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        !validPassword && res.status(400).json({ "Status": "error", "Message": "Incorrect Password" });
        user.token = generateToken(user.id)

        res.status(200).json({ "Status": "login Successful", "Data": user })
    } catch (e) {
        console.log(e);
        next(e);
    }
}