// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../middleware/isAdmin");
const Comment = require("../../schemas/commentSchema");
const Campground = require("../../schemas/campgroundSchema");

// =========================================
// DELETE COMMENT ROUTE: delete handler
// =========================================
const handler_deleteComment = async (req, res) => {

    try {
        const { id, comid } = req.params
        const foundComment = await Comment.findById(comid)
        const foundCampgroud = await Campground.findById(id)

        const isOwner = foundComment.author._id.equals(req.user._id)
        if (!isOwner && isAdmin(req) === false) { throw new Error("Invalid action") }

        await foundCampgroud.comments.remove({ _id: comid })
        await Comment.findByIdAndRemove(comid)
        req.flash("success", `Sucessfully deleted a comment`);
        res.redirect(`/campgrounds/camps/${id}`);
    }

    catch (error) {
        const { id } = req.params
        req.flash("error", `Something went wrong upon deleting a comment. ${error.message}`);
        res.redirect(`/campgrounds/camps/${id}`);
    }
};

// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = handler_deleteComment;