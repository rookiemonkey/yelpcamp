// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Campground = require("../schemas/campgroundSchema");

// =========================================
// UPDATE ROUTE: edit handler
// =========================================
router.put("/campgrounds/:id/update",( req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(req.session.passport !== undefined && foundCampground.uploader.id.equals(req.user.id)) {

            geocoder.geocode(req.body.updates.location, function (err, data) {
            if (err || !data.length) {
              req.flash('error', 'Invalid address');
              return res.redirect('back');
            }
            req.body.updates.lat = data[0].latitude;
            req.body.updates.lng = data[0].longitude;
            req.body.updates.location = data[0].formattedAddress;

            Campground.findByIdAndUpdate(req.params.id, req.body.updates, (err) => {
                if(err) {
                    req.flash("error", `Something went wrong upon updating. ${err.message} Please try again`);
                    res.redirect(`/campgrounds/${req.params.id}`);
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