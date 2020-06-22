// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const isAdmin = require("../middleware/isAdmin");
const opencage = require('opencage-api-client');
const Campground = require("../schemas/campgroundSchema");

// =========================================
// UPDATE ROUTE: edit handler
// =========================================
router.put("/campgrounds/:id/update",( req, res) => {
    Campground.findById(req.params.id, async (err, foundCampground) => {
        if(req.session.passport !== undefined && foundCampground.uploader.id.equals(req.user.id) || isAdmin(req)) {

            await opencage.geocode({ q: req.body.updates.location })
                .then(res => { return JSON.stringify(res)})
                .then(data => {
                    const d = JSON.parse(data)
                  if (d.status.code == 200) {
                    if (d.results.length > 0) {
                      req.body.updates.lat = d.results[0].geometry.lat;
                      req.body.updates.lng = d.results[0].geometry.lng;
                      req.body.updates.location = d.results[0].formatted;
                    }
                  } else if (d.status.code == 402) {
                    console.log('hit free-trial daily limit');
                    console.log('become a customer: https://opencagedata.com/pricing');
                  } else {
                    console.log('error', d.status.message);
                  }
                })
                .catch(error => {
                  console.log('error', error.message);
                });

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