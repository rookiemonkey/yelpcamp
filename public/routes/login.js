// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const sanitizer = require("express-sanitizer");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const Comment = require("../schemas/commentSchema");
const Campground = require("../schemas/campgroundSchema");
const User = require("../schemas/userSchema");

// ===========================
// LOGIN ROUTE: 
// ===========================
router.get("/campgrounds/login", (req, res) => {
    if(req.session.passport !== undefined) { 
        // redirect to home if user access the URL when logged in
        res.redirect('/');
    }
    res.render("login", {user: req.user});
});


// LOGIN ROUTE: handler 
router.post("/campgrounds/login", passport.authenticate("local", {
    successRedirect: "/",
    successFlash: true,
    failureRedirect: "/campgrounds/login",
    failureFlash: true
}), (req, res) => {});



// app.get('/login', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//       if (err) { return next(err); }
//       if (!user) { return res.redirect('/login'); }
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         return res.redirect('/users/' + user.username);
//       });
//     })(req, res, next);
//   });


// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;