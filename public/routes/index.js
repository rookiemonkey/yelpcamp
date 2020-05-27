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
// INDEX ROUTE
// ===========================
router.get("/", (req, res) => {
    res.redirect("/campgrounds");
});

router.get("/campgrounds", (req, res) =>{
    Campground.find().exec((err, foundCampground) => {
        res.render("campgrounds", {campgrounds: foundCampground, user: req.user});
    });
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;