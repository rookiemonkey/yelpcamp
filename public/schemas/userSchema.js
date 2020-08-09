const mongoose = require("mongoose");
const validator = require('validator');
const passportLocalMongoose = require("passport-local-mongoose")

let userSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
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
            if (!validator.isEmail(value)) { throw new Error('Please provide a valid email') }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!value || value.length < 8) { throw new Error('Please provide a password with minimum of 8 characters') }
        }
    },
    isAdmin: {
        type: Boolean,
        default: false,
        validate(value) {
            if (value) { throw new Error('Invalid action') }
        }
    },
    adminCode: {
        type: String,
        default: '',
        validate(value) {
            if (value) { throw new Error('Invalid action') }
        }
    },
    resetPasswordToken: {
        type: String,
        default: '',
        validate(value) {
            if (value) { throw new Error('Invalid action') }
        }
    },
    resetPasswordExpires: {
        type: Date,
        default: '',
        validate(value) {
            if (value) { throw new Error('Invalid action') }
        }
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)
