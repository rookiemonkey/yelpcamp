// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Campground = require("../../schemas/campgroundSchema");
const isAdmin = require("../../middleware/isAdmin");

// ===========================
// GET ALL REVIEWS ROUTE
// ===========================
const get_allReviews = async (req, res) => {

    try {
        const foundCampground = await Campground.findById(req.params.id)
            .populate({
                path: 'reviews',
                options: { sort: { createdAt: -1 } } // latest first
            })
            .exec()

        if (!foundCampground) { throw new Error('Campground not existing') }

        if (isAdmin(req)) {
            res.render("showReviews", {
                user: req.user,
                role: "ADMIN",
                campground: foundCampground
            });
        } else {
            res.render("showReviews", {
                user: req.user,
                role: null,
                campground: foundCampground
            });
        }
    }

    catch (error) {
        req.flash('error', `Something went wrong. ${error.message}`)
        res.redirect(`/campgrounds/camps/${req.params.id}`)
    }
}

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = get_allReviews