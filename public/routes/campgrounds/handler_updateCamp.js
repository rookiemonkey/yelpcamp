// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../middleware/isAdmin");
const cloudinary = require('cloudinary');
const toUpload = require("../../middleware/toUpload");
const toGeocode = require("../../middleware/toGeocode");
const setCloudinary = require("../../middleware/setCloudinary");
const Campground = require("../../schemas/campgroundSchema");

cloudinary.config(setCloudinary());

// =========================================
// UPDATE ROUTE: edit handler
// =========================================
const handler_updateCamp = (req, res) => {
  Campground.findById(req.params.id, async (err, foundCampground) => {
    if (req.session.passport !== undefined && foundCampground.uploader.id.equals(req.user.id) || isAdmin(req)) {

      const { image_default } = req.body;
      const imageUrl = await toUpload(cloudinary, req)
      const { lat, lng, formattedLocation } = await toGeocode(req.body.location);
      let image = imageUrl ? imageUrl : image_default
      const updates = { ...req.body, lat, lng, location: formattedLocation, image }

      Campground.findByIdAndUpdate(req.params.id, updates, (err) => {
        if (err) {
          req.flash("error", `Something went wrong upon updating. ${err.message} Please try again`);
          res.redirect(`/campgrounds/camps/${req.params.id}`);
        } else {
          req.flash("success", `"${foundCampground.campname}" was updated successfully`);
          res.redirect(`/campgrounds/camps/${req.params.id}`);
        }
      });
    } else {
      // if not logged in let them log in first
      req.flash("error", "Something is not right. You need to be logged in and should be the owner of the camp to edit it");
      res.redirect("/campgrounds/users/login");
    }
  })
};


// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = handler_updateCamp;