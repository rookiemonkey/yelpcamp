// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Review = require('../../schemas/reviewSchema')
const Campground = require('../../schemas/campgroundSchema')
const isAdmin = require('../../utilities/isAdmin')
const toAverage = require('../../utilities/toAverage')

// ===========================
// UPDATE REVIEW HANDLER
// ===========================
const handler_deleteReview = async (req, res) => {

    try {
        const foundReview = await Review.findById(req.params.reviewId, `_id author`)
        if (!foundReview) { throw new Error('Review not existing') }

        const isOwner = foundReview.author._id.equals(req.user._id)
        if (!isOwner && isAdmin(req) === false) { throw new Error("Invalid action") }

        await foundReview.remove()

        const foundCampground = await Campground.findByIdAndUpdate(req.params.id,
            { $pull: { reviews: req.params.reviewId } }, { new: true }
        )
            .populate('reviews')
            .exec()
        if (!foundCampground) { throw new Error('Campground not existing') }

        foundCampground.rating = toAverage(foundCampground.reviews)
        await foundCampground.save()

        req.flash('success', `Sucessfully deleted your review`)
        res.redirect(`/campgrounds/camps/${req.params.id}/reviews`)
    }

    catch (error) {
        req.flash('error', `Something went wrong. ${error.message}`)
        res.redirect(`/campgrounds/camps/${req.params.id}/reviews`)
    }
}

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_deleteReview