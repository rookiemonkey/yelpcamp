const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

let userShcema = mongoose.Schema({
    username: String,
    password: String
});

userShcema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userShcema)
