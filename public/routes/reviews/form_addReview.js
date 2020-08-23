// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Campground = require("../../schemas/campgroundSchema");
const isAdmin = require("../../middleware/isAdmin");

// ===========================
// GET REVIEW FORM ROUTE
// ===========================
const form_addReview = async (req, res) => {

    try {
        const foundCampground = await Campground.findById(req.params.id)

        if (!foundCampground) { throw new Error('Campground not existing') }

        const isCurrentUserAddingAReviewOnHisCamp = req.user.id == foundCampground.uploader.id
        if (isCurrentUserAddingAReviewOnHisCamp) { throw new Error("Invalid action") }

        if (isAdmin(req)) {
            res.render("addReview", {
                user: req.user,
                role: "ADMIN",
                campground: foundCampground
            });
        } else {
            res.render("addReview", {
                user: req.user,
                role: null,
                campground: foundCampground
            });
        }
    }

    catch (error) {
        req.flash("error", `${error.message}`);
        res.redirect(`/campgrouns/camps/${req.params.id}`);
    }
}

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = form_addReview;