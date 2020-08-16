// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Campground = require("../../schemas/campgroundSchema");
const Review = require('../../schemas/reviewSchema')
const toAverage = require('../../middleware/toAverage')

// ===========================
// ADD REVIEW HANDLER
// ===========================
const handler_addReview = async (req, res) => {

    try {
        const foundCampground = await Campground.findById(req.params.id)
            .populate('reviews')
            .exec()

        const newReview = await Review.create(req.body.review)

        newReview.author.id = req.user._id;
        newReview.author.username = req.user.username;
        newReview.campground = foundCampground;
        await newReview.save()

        foundCampground.reviews.push(newReview)
        foundCampground.rating = toAverage(foundCampground.reviews)
        await foundCampground.save()

        req.flash('success', `Sucessfully added your review`)
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
module.exports = handler_addReview