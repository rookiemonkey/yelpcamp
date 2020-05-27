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

// ~~ for some reason this only deletes the campground
// ~~ not sure if this happens only for object referencing and not in data embedding

// =========================================
// DELETE ROUTE: delete handler
// =========================================
router.delete("/campgrounds/:id/delete", (req, res) => {
    if(req.session.passport !== undefined) {
        Campground.findById(req.params.id, (err, foundCampgound) => {
            //compare the current user's id to the uploaders id
            if (req.user.id == foundCampgound.uploader.id) {
                // proceed with the delete process
                // however, comments will not be deleted only the campground
                // i've tried pre hook (see campgroundschema) but not working
                // im thinking that comments should be removed first since there is no
                // to reference if campground is removed first possible forEach loop?
                // ive tried everything but its taking too much time and i have to 
                // i was able to fix it by using a forEach loop
                
                let comids = foundCampgound.comments;
                comids.forEach(async function (comment) {
                    await Comment.findById(comment, async (err, foundComment) => {
                        if (err) {
                            console.log("ERROR UPON DELETING THE COMMENTS:", err)
                        } 
                        await foundComment.remove();
                    });
                });
                req.flash("info", `${foundCampgound.campname} is now removed from our catalogue`);
                foundCampgound.remove();
                res.redirect("/campgrounds");
            } else {
                // user need to be the uploader to delete this
                req.flash("error", "Something is not right. You need to be the owner of the camp to delete it");
                res.redirect("/campgrounds");
            }
        })
    } else {
        // if not logged in let them log in first
        req.flash("error", "Something is not right. You need to be logged in and owner of the camp to delete it");
        res.redirect("/campgrounds/login");
    }
});

// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = router;