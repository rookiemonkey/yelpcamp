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
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
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
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)
