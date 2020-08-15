// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../middleware/isAdmin");
const Campground = require("../../schemas/campgroundSchema");

// =========================================
// EDIT ROUTE; form
// =========================================
const form_updateCamp = async (req, res) => {
    try {
        const foundCampground = await Campground.findById(req.params.id)

        if (req.session.passport !== undefined &&
            foundCampground.uploader.id.equals(req.user.id) ||
            isAdmin(req)) {
            if (isAdmin(req)) {
                return res.render("editcampground", {
                    user: req.user,
                    campground: foundCampground,
                    role: "ADMIN"
                });
            } else {
                return res.render("editcampground", {
                    user: req.user,
                    campground: foundCampground,
                    role: null
                });
            }
        }

        req.flash("error", "Something is not right. You need to be logged in and should be the owner of the camp to edit it");
        res.redirect("/campgrounds/users/login")
    }

    catch (error) {
        req.flash("error", `Something is not right. ${error.message}`);
        res.redirect("/campgrounds/users/login")
    }
};

// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = form_updateCamp;