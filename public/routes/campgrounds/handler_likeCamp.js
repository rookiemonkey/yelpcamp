// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Campground = require("../../schemas/campgroundSchema");

// ===========================
// LIKE CAMP HANDLER
// ===========================
const handler_likeCamp = async (req, res) => {
    try {
        const foundCampground = await Campground.findById(req.params.id)

        const foundUserLike = foundCampground.likes.some(like => like.equals(req.user._id));

        foundUserLike
            ? foundCampground.likes.pull(req.user._id) // remove if already liked
            : foundCampground.likes.push(req.user) // add if not yet liked

        await foundCampground.save()

        if (foundUserLike) {
            req.flash('success', 'Successfully removed a like')
            return res.redirect(`/campgrounds/camps/${foundCampground._id}`)
        }

        req.flash('success', 'Successfully added a like')
        res.redirect(`/campgrounds/camps/${foundCampground._id}`)
    }

    catch (error) {
        req.flash('error', 'Something went wrong upon adding a like on the campground')
        res.redirect(`/campgrounds/camps/${foundCampground._id}`)
    }
}

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_likeCamp