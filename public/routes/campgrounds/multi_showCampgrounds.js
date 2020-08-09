// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Campground = require("../../schemas/campgroundSchema");
const isAdmin = require("../../middleware/isAdmin");
const toShuffle = require("../../middleware/toShuffle");

// ===========================
// INDEX ROUTE
// ===========================
const showCamgrounds = (req, res) => {
    if (!req.query.search) {
        Campground.find().exec((err, foundCampground) => {
            if (isAdmin(req)) {
                res.render("campgrounds", {
                    campgrounds: toShuffle(foundCampground),
                    message: null,
                    user: req.user,
                    role: "ADMIN"
                });
            } else {
                res.render("campgrounds", {
                    campgrounds: foundCampground,
                    message: null,
                    user: req.user,
                    role: null
                });
            }
        });

    } else {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({ campname: regex }).exec((err, foundCampground) => {
            foundCampground.length !== 0 || isAdmin(req) && foundCampground.length !== 0
                ? res.render("campgrounds", {
                    campgrounds: foundCampground,
                    message: null,
                    user: req.user,
                    role: "ADMIN"
                })
                : res.render("campgrounds", {
                    campgrounds: [],
                    message: "No Matching Campground",
                    user: req.user,
                    role: null
                })
        })
    }
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = showCamgrounds;