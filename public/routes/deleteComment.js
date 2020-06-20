// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const Comment = require("../schemas/commentSchema");
const Campground = require("../schemas/campgroundSchema");

// =========================================
// DELETE COMMENT ROUTE: delete handler
// =========================================
router.delete("/campgrounds/:id/comment/:comid/delete", (req, res) => {
    Comment.findById(req.params.comid, (err, foundComment) => {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (req.session.passport !== undefined && req.user.id == foundComment.author.id) {
                // removed comment reference from the campground first
                foundCampground.comments.remove({ _id: req.params.comid })
                // then removed the comment from the comments collections
                Comment.findByIdAndRemove(req.params.comid, (err => {
                    res.redirect(`/campgrounds/${req.params.id}`)
                }));
            } else {
                // display a message that they cannot do that
                req.flash("error", "Something is not right. You need to be delete a comment");
                return res.redirect(`/campgrounds/login`)
            }
        });
    });
});

// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = router;