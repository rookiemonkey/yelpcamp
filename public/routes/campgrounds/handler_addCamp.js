// ===========================
// ROUTE DEPENDENCIES
// ===========================
const multer = require('multer');
const cloudinary = require('cloudinary');
const isLoggedIn = require("../../middleware/isLoggedin");
const toUpload = require("../../middleware/toUpload");
const setMulter = require("../../middleware/setMulter");
const setCloudinary = require("../../middleware/setCloudinary");
const toGeocode = require("../../middleware/toGeocode");
const Campground = require("../../schemas/campgroundSchema");

// configure multer
const upload = setMulter(multer);

// configure cloudinary
cloudinary.config(setCloudinary());

// MIDDLEWARES = isLoggedIn, upload.single('image') 

// ===========================
// ADD CAMP HANDLER
// ===========================
const handler_addCamp = async (req, res) => {
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
                res.redirect("/campgrounds/camps");
            } else {
                req.flash("success", `Congratulations ${req.user.username}! Your new camp "${addedCamp.campname}" is now added on our catalogue`)
                res.redirect("/campgrounds/camps");
            };
        });
    } catch (err) {
        req.flash('error', `Something went wrong upon creating the campground. ${err.message}`)
        res.redirect('/campgrounds/camps/new');
    }
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_addCamp;