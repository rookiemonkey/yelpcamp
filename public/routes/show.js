// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const Campground = require("../schemas/campgroundSchema");

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