// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Review = require('../../schemas/reviewSchema')
const isAdmin = require("../../middleware/isAdmin")

// ===========================
// GET UPDATE REVIEW FORM ROUTE
// ===========================
const form_updateReview = async (req, res) => {

    try {
        const foundReview = await Review.findById(req.params.reviewId)

        if (!foundReview) { throw new Error('Review not existing') }

        if (JSON.stringify(foundReview.author._id) !== JSON.stringify(req.user.id)) {
            throw new Error('Invalid action. You are not the author of the review')
        }

        if (isAdmin(req)) {
            res.render("updateReview", {
                user: req.user,
                role: "ADMIN",
                campgroundId: req.params.id,
                review: foundReview
            });
        } else {
            res.render("updateReview", {
                user: req.user,
                role: null,
                campgroundId: req.params.id,
                review: foundReview
            });
        }
    }

    catch (error) {
        req.flash("error", `${error.message}`);
        res.redirect(`/campgrounds/camps/${req.params.id}/reviews`);
    }
}

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = form_updateReview