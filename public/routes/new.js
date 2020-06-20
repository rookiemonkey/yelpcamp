// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const NodeGeocoder = require('node-geocoder');
const isLoggedIn = require("../middleware/isLoggedIn");
const Campground = require("../schemas/campgroundSchema");

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

// ===========================
// NEW ROUTE
// ===========================
router.get("/campgrounds/new", isLoggedIn, (req, res) => {
    res.render("addcampground", {user: req.user});
});

// ===========================
// CREATE ROUTE: handler for new campgrounds
// ===========================
router.post("/campgrounds/new", (req, res) => {
    // req.body.value is value of the name attribute on the form
    const campname = req.sanitize(req.body.name);
    const location = req.sanitize(req.body.location);
    const description = req.sanitize(req.body.description);
    const uploader = { id: req.user.id, name: req.user.username}

    geocoder.geocode(location, function (err, data) {
    if (err || !data.length) {
      req.flash("error", "Invalid address");
      return res.redirect("/campgrounds");
    }
    const lat = data[0].latitude;
    const lng = data[0].longitude;
    const GeocodedLocation = data[0].formattedAddress;

    const newCampground = {
        campname: campname,
        price: req.body.price,
        image: req.body.image,
        location: GeocodedLocation,
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