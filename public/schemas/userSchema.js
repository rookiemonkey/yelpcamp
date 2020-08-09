const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

let userSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        unique: true,
        require: true,
        validate(value) {
            if (!value) { throw new Error('Please provide a valid username') }
        }
    },
    email: {
        type: String,
        unique: true,
        require: true,
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
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)
