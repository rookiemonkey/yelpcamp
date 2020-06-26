const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

let userSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    adminCode: {
        type: String,
        default: ''
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)
