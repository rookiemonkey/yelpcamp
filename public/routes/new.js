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
// NEW ROUTE
// ===========================
router.get("/campgrounds/new", isLoggedIn, (req, res) => {
    res.render("addcampground", {user: req.user});
});

// ===========================
// CREATE ROUTE: handler for new campgrounds
// ===========================
router.post("/campgrounds/new", isLoggedIn,(req, res) => {
    // req.body.value is value of the name attribute on the form
    let campname = req.sanitize(req.body.name);
    let location = req.sanitize(req.body.location);
    let description = req.sanitize(req.body.description);
    let uploader = { id: req.user.id, name: req.user.username}
    let newCampground = {
        campname: campname, 
        image: req.body.image, 
        location: location, 
        description: description,
        uploader: uploader};
    Campground.create(newCampground, (err, addedCamp) => {
        if (err) {
            req.flash("error", err.message)
            res.redirect("/campgrounds");
        } else {
            req.flash("success", `Congratulations ${req.user.username}! Your new camp "${addedCamp.campname}" is now added on our catalogue`)
            res.redirect("/campgrounds");
        };
    });
});


// midlleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if(req.session.passport !== undefined){
        return next(); 
    } else {
        req.flash("error", "Something is not right. You need to be logged in to add a new camp");
        res.redirect("/campgrounds/login");
    };
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;