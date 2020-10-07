// ===========================
// ROUTE DEPENDENCIES
// ===========================
const User = require("../../schemas/userSchema");
const Campground = require("../../schemas/campgroundSchema");
const Review = require('../../schemas/reviewSchema');
const isAdmin = require("../../utilities/isAdmin");

// ===========================
// PASSWORD RESET FORM ROUTE:
// ===========================
const get_currentUserProfile = async (req, res) => {

    try {
        const foundUser = await User.findById(req.user._id)
        if (!foundUser) { throw new Error('User not found') }

        const foundUserCamps = await Campground
            .find({})
            .where('uploader.id')
            .equals(foundUser._id)

        const userReviews = await Review
            .find({})
            .where('author._id')
            .equals(foundUser._id)

        const foundUserReviews = await Promise.all(
            userReviews.map(async review => {
                const options = `_id campname image location`
                const foundCamp = await Campground.findById(review.campground, options)
                const { rating, text, createdAt, _id } = review
                return { rating, text, createdAt, _id, campground: foundCamp }
            }))

        if (isAdmin(req)) {
            res.render("userProfile", {
                user: req.user,
                role: "ADMIN",
                foundUser,
                foundUserCamps,
                foundUserReviews
            });
        } else {
            res.render("userProfile", {
                user: req.user,
                role: null,
                foundUser,
                foundUserCamps,
                foundUserReviews
            });
        }
    }

    catch (error) {
        req.flash('error', `Something went wrong. ${error.message}`)
        res.redirect('/campgrounds/camps')
    }
}

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = get_currentUserProfile