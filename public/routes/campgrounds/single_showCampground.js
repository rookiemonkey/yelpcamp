// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../middleware/isAdmin");
const Campground = require("../../schemas/campgroundSchema");

// ===========================
// SHOW ROUTE
// ===========================
const showCampground = async (req, res) => {
    try {
        const foundCampground = await Campground.findById(req.params.id)
            .populate('comments likes reviews')

        if (isAdmin(req)) {
            res.render("showCampground", {
                campground: foundCampground,
                user: req.user,
                role: "ADMIN"
            });
        } else {
            res.render("showCampground", {
                campground: foundCampground,
                user: req.user,
                role: null
            });
        }
    }

    catch (error) {
        req.flash("error", `Something went wrong upon fetching the camp ${error.message}`)
        res.redirect("/campgrounds/camps");
    }
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = showCampground;