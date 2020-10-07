const passport = require("passport");

module.exports = passport.authenticate("local", {
    failureRedirect: "/campgrounds/users/login",
    failureFlash: 'Invalid username or password'
})