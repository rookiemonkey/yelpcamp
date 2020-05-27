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
// LOGOUT ROUTE: 
// ===========================
router.get("/campgrounds/logout", isLoggedIn, (req, res) => {
    // req.logOut(); // is not working
    // req.session.passport = undefined; // this one worked what i've made up but cookie is still there
    res.status(200).clearCookie('connect.sid', { // this is from stackoverflow and this one clears out the cookie
        path: '/'
      });
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});






// // login tester
// // this one worked and only logged in users can access the page
// // with the help of the middleware isLoggedIn
router.get("/secret", isLoggedIn, (req, res) => {
    console.log(req);
    res.send("if you can access this, it means YOUR ARE STILL LOGGED IN")
})


// middleware - check if signed in
// middlewares always has 3 parameters
function isLoggedIn(req, res, next) {
    // req.session.passport contains an object when user is signed
    // if not, req.session.passport is undefined
    let rt = req.route;
    let rs = req.session;
    if(rs.passport !== undefined){
        if(rt.path === "/campgrounds/signup" && rt.hasOwnProperty("methods")) {
            res.redirect("/"); 
            // msg should show they are logged in hence cannot create an account
        } else {
            return next();
        }
    } else if (rs.passport === undefined && rt.methods.post === true) {
            return next();
    } else {
        res.redirect("/campgrounds/login");
    }
};


// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;