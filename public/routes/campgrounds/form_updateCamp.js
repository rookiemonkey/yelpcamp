// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../middleware/isAdmin");
const Campground = require("../../schemas/campgroundSchema");

// =========================================
// EDIT ROUTE; form
// =========================================
const form_updateCamp = (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (req.session.passport !== undefined && foundCampground.uploader.id.equals(req.user.id) || isAdmin(req)) {
            if (isAdmin(req)) {
                res.render("editcampground", {
                    user: req.user,
                    campground: foundCampground,
                    role: "ADMIN"
                });
            } else {
                res.render("editcampground", {
                    user: req.user,
                    campground: foundCampground,
                    role: null
                });
            }
        } else {
            // if not logged in let them log in first
            req.flash("error", "Something is not right. You need to be logged in and should be the owner of the camp to edit it");
            res.redirect("/campgrounds/users/login")
        }
    })
};

// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = form_updateCamp;