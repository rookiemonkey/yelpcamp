// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const Campground = require("../schemas/campgroundSchema");

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