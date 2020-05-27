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
// SIGNUP ROUTE: 
// ===========================
router.get("/campgrounds/signup", (req, res) => {
    if(req.session.passport !== undefined) { 
        // msg: you are already logged in
        res.redirect("/");
    }
    res.render("signup", {user: req.user});
});


// SIGNUP ROUTE: handler
router.post("/campgrounds/signup", isLoggedIn, (req, res) => {
    User.register(new User ({username: req.body.username}), req.body.password, (err, newUser) => {
        if(err) {
            req.flash("error", `Unfortunately, server encountered an error: ${err.message}`);
            res.redirect("/campgrounds/signup");
        } else {
            passport.authenticate("local")(req, res, function(){res.redirect("/")} )
        }
    });
});




// // login tester
// // this one worked and only logged in users can access the page
// // with the help of the middleware isLoggedIn
// router.get("/secret", isLoggedIn, (req, res) => {
//     console.log(req);
//     res.send("if you can access this, it means YOUR ARE STILL LOGGED IN")
// })


// middleware - check if signed in
// middlewares always has 3 parameters
function isLoggedIn(req, res, next, err) {
    // req.session.passport contains an object when user is signed
    // if not logged in, req.session.passport is undefined
    if (req.session.passport !== undefined) {
        res.redirect("/campgrounds")
    } else {
        next()
    }
};



// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;