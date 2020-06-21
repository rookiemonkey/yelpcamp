// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const opencage = require('opencage-api-client');
const isLoggedIn = require("../middleware/isLoggedIn");
const Campground = require("../schemas/campgroundSchema");

// data.results[0].geometry.lat
// data.results[0].geometry.lng
// data.results[0].formatted
// data.status.code
// data.status.message

// ===========================
// NEW ROUTE
// ===========================
router.get("/campgrounds/new", isLoggedIn, (req, res) => {
    res.render("addcampground", {user: req.user});
});

// ===========================
// CREATE ROUTE: handler for new campgrounds
// ===========================
router.post("/campgrounds/new", async (req, res) => {
    const campname = req.sanitize(req.body.name);
    const location = req.sanitize(req.body.location);
    const description = req.sanitize(req.body.description);
    const uploader = { id: req.user.id, name: req.user.username}
    let lat, lng, formattedLocation;

    await opencage.geocode({ q: location })
        .then(res => { return JSON.stringify(res)})
        .then(data => {
            const d = JSON.parse(data)
          if (d.status.code == 200) {
            if (d.results.length > 0) {
              lat = d.results[0].geometry.lat;
              lng = d.results[0].geometry.lng;
              formattedLocation = d.results[0].formatted;
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

    const newCampground = {
        campname: campname,
        price: req.body.price,
        image: req.body.image,
        location: formattedLocation,
        lat: lat,
        lng: lng,
        description: description,
        uploader: uploader
    };

    Campground.create(newCampground, (err, addedCamp) => {
        if (err) {
            req.flash("error", err.message)
            res.redirect("/campgrounds");
        } else {
            req.flash("success", `Congratulations ${req.user.username}! Your new camp "${addedCamp.campname}" is now added on our catalogue`)
            res.redirect("/campgrounds");
        };
    });
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;