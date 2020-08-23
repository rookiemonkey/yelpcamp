// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Campground = require("../../schemas/campgroundSchema");
const Review = require('../../schemas/reviewSchema')
const areValidInputs = require('../../middleware/areValidInputs')
const toAverage = require('../../middleware/toAverage')

// ===========================
// ADD REVIEW HANDLER
// ===========================
const handler_addReview = async (req, res) => {

    try {
        const foundCampground = await Campground
            .findById(req.params.id, `_id reviews rating uploader`)
            .populate('reviews uploader')
            .exec()

        const isCurrentUserAddingAReviewOnHisCamp = req.user.id == foundCampground.uploader.id
        if (isCurrentUserAddingAReviewOnHisCamp) { throw new Error("Invalid action") }

        const validInputs = ['text', 'rating']
        const areValid = areValidInputs(validInputs, req.body.review)
        if (!areValid) { throw new Error("Invalid fields provided") }

        const { text } = req.body.review
        req.body.review.text = req.sanitize(text)
        const newReview = await Review.create(req.body.review)

        newReview.author._id = req.user.id;
        newReview.author.username = req.user.username;
        newReview.author.avatar = req.user.avatar;
        newReview.campground = foundCampground._id;
        await newReview.save()

        foundCampground.reviews.push(newReview)
        foundCampground.rating = toAverage(foundCampground.reviews)
        await foundCampground.save()

        req.flash('success', `Sucessfully added your review`)
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
module.exports = handler_addReview