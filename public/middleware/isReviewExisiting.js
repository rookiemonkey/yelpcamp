const Campground = require('../schemas/campgroundSchema')

const isReviewExisiting = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) { throw new Error('Please login first') }

        const foundCampground = await Campground.findById(req.params.id)
            .populate("reviews")

        if (!foundCampground) { throw new Error('Campground not existing') }

        const foundUserReview = foundCampground.reviews.some(review => {
            return review.author._id.equals(req.user._id);
        });

        if (foundUserReview) { throw new Error(`You've already made a review on this post`) }

        next()

    }

    catch (error) {
        req.flash("error", `${error.message}`);
        res.redirect(`/campgrounds/camps/${req.params.id}`);
    }

}

module.exports = isReviewExisiting