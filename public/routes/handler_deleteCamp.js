// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const Comment = require("../schemas/commentSchema");
const Campground = require("../schemas/campgroundSchema");

// =========================================
// DELETE CAMP ROUTE: delete handler
// =========================================
router.delete("/campgrounds/:id/delete", (req, res) => {
    if (req.session.passport !== undefined) {
        Campground.findById(req.params.id, (err, foundCampgound) => {

            //compare the current user's id to the uploaders id
            if (req.user.id == foundCampgound.uploader.id || isAdmin(req)) {

                // remove the commenta associate to the camp, since hooks are not working
                let comids = foundCampgound.comments;
                comids.forEach(async function (comment) {
                    await Comment.findById(comment, async (err, foundComment) => {
                        await foundComment.remove();
                    });
                });

                // remove the campgound once done
                foundCampgound.remove();
                req.flash("info", `${foundCampgound.campname} is now removed from our catalogue`);
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