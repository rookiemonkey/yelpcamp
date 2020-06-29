// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const isAdmin = require("../middleware/isAdmin");
const isLoggedIn = require("../middleware/isLoggedin");
const toUpload = require("../middleware/toUpload");
const setMulter = require("../middleware/setMulter");
const setCloudinary = require("../middleware/setCloudinary");
const toGeocode = require("../middleware/toGeocode");
const Campground = require("../schemas/campgroundSchema");

// configure multer
const upload = setMulter(multer);

// configure cloudinary
cloudinary.config(setCloudinary());

// ===========================
// NEW ROUTE
// ===========================
router.get("/campgrounds/new", isLoggedIn, (req, res) => {
  if (isAdmin(req)) {
    res.render("addcampground", {
      user: req.user,
      role: "ADMIN"
    });
  } else {
    res.render("addcampground", {
      user: req.user,
      role: null
    });
  }
});

// ===========================
// CREATE ROUTE: handler for new campgrounds
// ===========================
router.post("/campgrounds/new", isLoggedIn, upload.single('image'), async (req, res) => {
  try {
    const uploaded = await toUpload(cloudinary, req).then(u => { return u.secure_url });
    const location = req.sanitize(req.body.location);
    const loc = await toGeocode(location);
    const campname = req.sanitize(req.body.name);
    const description = req.sanitize(req.body.description);
    const uploader = { id: req.user.id, name: req.user.username }

    const newCampground = {
      campname: campname,
      price: req.body.price,
      image: uploaded,
      location: loc.formattedLocation,
      lat: loc.lat,
      lng: loc.lng,
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
  } catch (err) {
    req.flash('error', `Something went wrong upon creating the campground. ${err.message}`)
    res.redirect('/campgrounds/new');
  }
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;