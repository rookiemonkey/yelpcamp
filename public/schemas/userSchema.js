const mongoose = require("mongoose");
const validator = require('validator');
const passportLocalMongoose = require("passport-local-mongoose")

let userSchema = mongoose.Schema({
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/promises/image/upload/v1596613153/global_default_image.png'
    },
    firstName: {
        type: String,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid username') }
        }
    },
    lastName: {
        type: String,
        required: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid username') }
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
            if (!validator.isEmail(value)) { throw new Error('Please provide a valid email') }
        }
    },
    password: String,
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
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)
