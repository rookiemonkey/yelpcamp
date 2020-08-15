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
const handler_updateCamp = async (req, res) => {

  try {
    const foundCampground = await Campground.findById(req.params.id)

    if (req.session.passport !== undefined &&
      foundCampground.uploader.id.equals(req.user.id) || isAdmin(req)) {

      const { image_default } = req.body;
      const { lat, lng, formattedLocation } = await toGeocode(req.body.location);
      const imageUrl = await toUpload(cloudinary, req)
      const image = imageUrl ? imageUrl : image_default
      const updates = { ...req.body, lat, lng, location: formattedLocation, image }

      await Campground.findByIdAndUpdate(req.params.id, updates)
      req.flash("success", `"${foundCampground.campname}" was updated successfully`);
      return res.redirect(`/campgrounds/camps/${req.params.id}`);
    }

    throw new Error('You need to be logged in and should be the owner of the camp to edit it')
  }

  catch (error) {
    req.flash("error", `Something is not right. ${error.message}`);
    res.redirect(`/campgrounds/camps/${req.params.id}`);
  }
};


// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = handler_updateCamp;