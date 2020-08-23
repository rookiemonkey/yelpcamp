// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Review = require('../../schemas/reviewSchema')
const Campground = require('../../schemas/campgroundSchema')
const toAverage = require('../../middleware/toAverage')

// ===========================
// UPDATE REVIEW HANDLER
// ===========================
const handler_updateReview = async (req, res) => {

    try {
        const foundReview = await Review.findById(req.params.reviewId)
        if (!foundReview) { throw new Error('Review not existing') }

        const isOwner = foundReview.author._id.equals(req.user.id)
        if (!isOwner) { throw new Error("Invalid action") }

        await foundReview.update(req.body.review)

        const foundCampground = await Campground.findById(req.params.id)
            .populate('reviews')
            .exec()
        if (!foundCampground) { throw new Error('Campground not existing') }

        foundCampground.rating = toAverage(foundCampground.reviews)
        await foundCampground.save()

        req.flash('success', `Sucessfully updated your review`)
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
module.exports = handler_updateReview