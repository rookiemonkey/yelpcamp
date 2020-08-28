// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../middleware/isAdmin");
const Comment = require("../../schemas/commentSchema");
const Campground = require("../../schemas/campgroundSchema");

// =========================================
// DELETE CAMP ROUTE: delete handler
// =========================================
const handler_deleteCamp = async (req, res) => {

    try {
        const foundCampground = await Campground.findById(req.params.id)

        const isOwner = foundCampground.uploader.id.equals(req.user._id)
        if (!isOwner && isAdmin(req) === false) { throw new Error("Invalid action") }

        // remove the comments associate to the camp, since hooks are not working
        let comids = foundCampground.comments;
        comids.forEach(async function (comment) {
            await Comment.findById(comment, async (err, foundComment) => {
                await foundComment.remove();
            });
        });

        // remove the campgound once done
        await foundCampground.remove();
        req.flash("info", `${foundCampground.campname} is now removed from our catalogue`);
        return res.redirect("/campgrounds/camps");
    }

    catch (error) {
        req.flash("error", `Something is not right. ${error.message}`);
        res.redirect(`/campgrounds/camps/${req.params.id}`);
    }
};

// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = handler_deleteCamp;