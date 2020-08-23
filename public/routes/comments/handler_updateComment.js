// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../middleware/isAdmin");
const Comment = require("../../schemas/commentSchema");

// =========================================
// UPDATE COMMENT ROUTE: update handler
// =========================================
const handler_updateComment = async (req, res) => {

    try {
        const { id, comid } = req.params
        const { comment } = req.body
        const foundComment = await Comment.findById(comid)

        const isOwner = foundComment.author.id.equals(req.user.id)
        if (!isOwner) { throw new Error("Invalid action") }

        const newComment = req.sanitize(comment);
        await Comment.findByIdAndUpdate(comid, { comment: newComment })
        req.flash("success", `Sucessfully updated a comment`);
        res.redirect(`/campgrounds/camps/${id}`);
    }

    catch (error) {
        const { id } = req.params
        req.flash("error", `Something went wrong upon updating a comment. ${error.message}`);
        return res.redirect(`/campgrounds/camps/${id}/comment`)
    }
};

// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = handler_updateComment;