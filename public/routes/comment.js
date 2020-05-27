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
// SHOW ROUTE: handler for new comments
// ===========================
router.post("/campgrounds/:id/comment", isLoggedIn, (req, res) => {
    // looks for the post being comemnted by the user
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.error(err);
        } else {

            // creates the comment and associates the one who commented
            Comment.create({
                comment: req.sanitize(req.body.comment),
                author: {
                    id: req.user.id,
                    name: req.user.username}}, 
                (err, newComment) => {

                // adds the comment to the comment's array since its based on that schema
                foundCampground.comments.push(newComment);

                // once save the campground will be saved again in the database to update
                foundCampground.save();

                // redirects  to the same pag with the updated version of the page.
                res.redirect(`/campgrounds/${req.params.id}`);
            });
        };
    });
});

// midlleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if(req.session.passport !== undefined){
        return next(); 
    } else {
        req.flash("error", "Something is not right. You need to be logged in to add a comment");
        res.redirect("/campgrounds/login");
    };
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;