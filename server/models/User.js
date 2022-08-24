const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Enter a username.'],
        min: 3,
        max: 20,
        unique: [true, 'That username is taken.'],
        validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
    },
    email: {
        type: String,
        required: [true, 'Enter an email address.'],
        max: 50,
        unique: [true, 'That email address is taken.'],
        validate: [validator.isEmail, 'Enter a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Enter a password.'],
        min: [6, 'Password should be at least 6 characters'],
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Retype your password.'],
        validate: {
            validator: function (el) {
                return el === this.password;
            }, message: 'Passwords don\'t match.'
        }
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Choose not to say'],
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    }
},
    { timestamps: true }
);

//schema middleware to apply before saving
UserSchema.pre('save', async function (next) {
    // hash password
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

module.exports = mongoose.model("User", UserSchema)