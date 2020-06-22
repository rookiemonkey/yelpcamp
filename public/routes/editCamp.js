// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const sanitizer = require("express-sanitizer");
const isAdmin = require("../middleware/isAdmin");
const Campground = require("../schemas/campgroundSchema");

// =========================================
// EDIT ROUTE; form
// =========================================
router.get("/campgrounds/:id/edit", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(req.session.passport !== undefined && foundCampground.uploader.id.equals(req.user.id) || isAdmin(req)) {
            req.flash("success", `${req.user}, you've successfuly updated ${foundCampground.campname}`);
            res.render("editcampground", {
                user: req.user,
                campground: foundCampground
            });
        } else {
            // if not logged in let them log in first
            req.flash("error", "Something is not right. You need to be logged in and should be the owner of the camp to edit it");
            res.redirect("/campgrounds/login")
        }
    })
});

// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = router;