// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Campground = require("../../schemas/campgroundSchema");
const isAdmin = require("../../middleware/isAdmin");
const toShuffle = require("../../middleware/toShuffle");

// ===========================
// INDEX ROUTE
// ===========================
const showCamgrounds = async (req, res) => {
    try {
        if (!req.query.search) {
            const foundCampgrounds = await Campground.find()

            let role; if (isAdmin(req)) { role = 'ADMIN' } else { role = null }

            return res.render("campgrounds", {
                campgrounds: toShuffle(foundCampgrounds),
                message: null,
                user: req.user,
                role,
            });
        }

        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        const foundCampgrounds = await Campground.find({ campname: regex })
        if (foundCampgrounds.length !== 0 ||
            isAdmin(req) &&
            foundCampgrounds.length !== 0) {
            return res.render("campgrounds", {
                campgrounds: toShuffle(foundCampgrounds),
                message: `Search results for: "${req.query.search}"`,
                user: req.user,
                role: "ADMIN"
            })
        }

        return res.render("campgrounds", {
            campgrounds: [],
            message: `No Matching Campground for: "${req.query.search}"`,
            user: req.user,
            role: null
        })
    }

    catch (error) {
        req.flash('error', `Something went wrong. ${error.message}`)
        res.redirect('/campgrounds/camps')
    }
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = showCamgrounds;