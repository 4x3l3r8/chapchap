const User = require("../models/User");
const AppError = require('./../utils/AppError');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require('../utils/tokenGenerator');
const helpers = require("../utils/helpers");

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
            const { password, updatedAt, ...other } = user._doc;
            return res.status(201).json({
                "Status": "Operation Successful", "Data": other
            });
        } else {
            // throw new Error('Invalid Request')
            return res.status(400).json({ message: "Invalid Request" })

        }

    } catch (e) {
        console.log(e);
        next(e)
    }
}

// @desc  Login User
exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: helpers.sanitize(req.body.email) });
        if (!user) { return res.status(404).json({ "Status": "error", "Message": "Account doesn't exist" }); }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) { return res.status(400).json({ "Status": "error", "Message": "Incorrect Password" }); }
        // user.token = generateToken(user.id)

        /* === === === Use this response for jwt === === === */
        // return res.status(200).json({
        //     "Status": "login Successful", "Data": {
        //         _id: user.id,
        //         email: user.email,
        //         username: user.username,
        //         token: generateToken(user.id)
        //     }
        // })
        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json({
            "Status": "login Successful", "Data": other
        })
    } catch (e) {
        console.log(e);
        next(e);
    }
}