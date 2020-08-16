// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Review = require('../../schemas/reviewSchema')
const Campground = require('../../schemas/campgroundSchema')
const toAverage = require('../../middleware/toAverage')

// ===========================
// UPDATE REVIEW HANDLER
// ===========================
const handler_deleteReview = async (req, res) => {

    try {
        const foundReview = await Review.findById(req.params.reviewId)
        if (!foundReview) { throw new Error('Review not existing') }

        if (foundReview.author._id !== req.user.id) {
            throw new Error('Invalid action. You are not the author of the review')
        }

        await foundReview.remove()

        const foundCampground = await Campground.findByIdAndUpdate(req.params.id,
            { $pull: { reviews: req.params.review_id } }, { new: true }
        )
            .populate('reviews')
            .exec()
        if (!foundCampground) { throw new Error('Campground not existing') }

        foundCampground.rating = toAverage(foundCampground.reviews)
        await foundCampground.save()

        req.flash('success', `Sucessfully deleted your review`)
        res.redirect(`/campgrounds/camps/${req.params.id}`)
    }

    catch (error) {
        req.flash('error', `Something went wrong. ${error.message}`)
        res.redirect(`/campgrounds/camps/${req.params.id}`)
    }
}

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_deleteReview