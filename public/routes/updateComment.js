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

// ===========================
// UPDATE COMMENT ROUTE
// ===========================
// router.put("/campgrounds/:id/comment/:comid/update", (req, res) => {
//     let sanitizedComment = req.sanitize(req.body.comment);
//     Comment.findByIdAndUpdate(req.params.comid, {
//         comment: sanitizedComment
//     }, (err) => {
//         res.redirect(`/campgrounds/${req.params.id}`);
//     });
// });

router.put("/campgrounds/:id/comment/:comid/update", (req, res) => {
    Comment.findById(req.params.comid, (err, foundComment) => {
        if (req.session.passport !== undefined && req.user.id == foundComment.author.id) {
            let sanitizedComment = req.sanitize(req.body.comment);
            Comment.findByIdAndUpdate(req.params.comid, {
                comment: sanitizedComment
            }, (err) => {
                res.redirect(`/campgrounds/${req.params.id}`);
            });
        } else {
            req.flash("error", "Something is not right. You need to be logged to edit a comment");
            return res.redirect(`/campgrounds/login`) 
        }
    })
});


// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = router;