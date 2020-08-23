const mongoose = require("mongoose");
const isEmail = require('validator/lib/isEmail');
const passportLocalMongoose = require("passport-local-mongoose")

let userSchema = mongoose.Schema({
    avatar: String,
    firstName: {
        type: String,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid first name') }
        }
    },
    lastName: {
        type: String,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid last name') }
        }
    },
    username: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid username') }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!isEmail(value)) { throw new Error('Please provide a valid email') }
        }
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    adminCode: {
        type: String,
        default: ''
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetPasswordExpires: {
        type: Date,
        default: ''
    }
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)
