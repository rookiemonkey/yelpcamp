// ===========================
// ROUTE DEPENDENCIES
// ===========================
const cloudinary = require('cloudinary');
const toUpload = require("../../middleware/toUpload");
const toGeocode = require("../../middleware/toGeocode");
const setCloudinary = require("../../middleware/setCloudinary");
const areValidInputs = require('../../middleware/areValidInputs')
const Campground = require("../../schemas/campgroundSchema");

cloudinary.config(setCloudinary());

// ===========================
// ADD CAMP HANDLER
// ===========================
const handler_addCamp = async (req, res) => {
    try {

        const validInputs = ['name', 'location', 'description', 'price', 'image']
        const areValid = areValidInputs(validInputs, req.body)
        if (!areValid) { throw new Error("Invalid fields provided") }

        const location = req.sanitize(req.body.location);
        const campname = req.sanitize(req.body.name);
        const description = req.sanitize(req.body.description);
        const uploader = { id: req.user.id, name: req.user.username }
        const loc = await toGeocode(location);
        const uploaded = await toUpload(cloudinary, req);

        const newCampground = {
            campname,
            price: req.body.price,
            image: uploaded,
            location: loc.formattedLocation,
            lat: loc.lat,
            lng: loc.lng,
            description,
            uploader,
        };

        const addedCamp = await Campground.create(newCampground)
        req.flash("success", `Congratulations ${req.user.username}! Your new camp "${addedCamp.campname}" is now added on our catalogue`)
        res.redirect("/campgrounds/camps");

    } catch (err) {
        req.flash('error', `Something went wrong upon creating the campground. ${err.message}`)
        res.redirect('/campgrounds/camps/new');
    }
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_addCamp;