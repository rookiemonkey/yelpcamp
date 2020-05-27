// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const sanitizer = require("express-sanitizer");
const methodOverride = require("method-override");
const parser = require("body-parser");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const Comment = require("../schemas/commentSchema");
const Campground = require("../schemas/campgroundSchema");
const User = require("../schemas/userSchema");

// =========================================
// UPDATE ROUTE: edit handler
// =========================================
router.put("/campgrounds/:id/update",( req, res) => {
    // req.body.updates is a single object from the edit route -- updates[objKey]
    // containing all the information about the updates
    // instead of storing each in a variable
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(req.session.passport !== undefined && foundCampground.uploader.id.equals(req.user.id)) {
            Campground.findByIdAndUpdate(req.params.id, req.body.updates, (err) => {
                if(err) {
                    console.error(err);
                } else {
                    req.flash("success", `${req.user.username}, your "${foundCampground.campname}" camp was updated successfully`);
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            });
        } else {
            // if not logged in let them log in first
            req.flash("error", "Something is not right. You need to be logged in and should be the owner of the camp to edit it");
            res.redirect("/campgrounds/login");
        }
    })
});


// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = router;