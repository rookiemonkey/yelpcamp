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
// SHOW ROUTE
// ===========================
router.get("/campgrounds/:id", (req, res) =>{
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.error("ERROR BEFORE SHOWING THE CHOSEN CAMPGROUND....", err);
        } else {
            res.render("showCampground", {campground: foundCampground, user: req.user});
        };
    });
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;