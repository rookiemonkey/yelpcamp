// ===========================
// ROUTE DEPENDENCIES
// ===========================
const cloudinary = require('cloudinary');
const isAdmin = require("../../utilities/isAdmin");
const toUpload = require("../../utilities/toUpload");
const toGeocode = require("../../utilities/toGeocode");
const setCloudinary = require("../../utilities/setCloudinary");
const areValidInputs = require('../../utilities/areValidInputs');
const Campground = require("../../schemas/campgroundSchema");

cloudinary.config(setCloudinary());

// =========================================
// UPDATE ROUTE: edit handler
// =========================================
const handler_updateCamp = async (req, res) => {

  try {
    const foundCampground = await Campground.findById(req.params.id)

    const isOwner = foundCampground.uploader.id.equals(req.user._id)
    if (!isOwner && isAdmin(req) === false) { throw new Error("Invalid action") }

    const validInputs = ['campname', 'location', 'description', 'price', 'image_default', 'image_update']
    const areValid = areValidInputs(validInputs, req.body)
    if (!areValid) { throw new Error("Invalid fields provided") }

    const { image_default, campname, location, description } = req.body;
    req.body.campname = req.sanitize(campname)
    req.body.location = req.sanitize(location)
    req.body.description = req.sanitize(description)

    const { lat, lng, formattedLocation } = await toGeocode(req.body.location);
    const imageUrl = await toUpload(cloudinary, req)
    const image = imageUrl ? imageUrl : image_default
    const updates = { ...req.body, lat, lng, location: formattedLocation, image }

    await Campground.findByIdAndUpdate(req.params.id, updates)
    req.flash("success", `"${foundCampground.campname}" was updated successfully`);
    return res.redirect(`/campgrounds/camps/${req.params.id}`);

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