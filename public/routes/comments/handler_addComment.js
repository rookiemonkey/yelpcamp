// ===========================
// ROUTE DEPENDENCIES
// ===========================
const Comment = require("../../schemas/commentSchema");
const Campground = require("../../schemas/campgroundSchema");

// ===========================
// SHOW ROUTE: handler for new comments
// ===========================
const handler_addComment = async (req, res) => {

    try {
        const { id } = req.params
        const { id: comid, username } = req.user
        const { comment } = req.body
        const newCommentOption = {
            comment: req.sanitize(comment),
            author: { id: comid, username }
        }
        const foundCampground = await Campground.findById(id)
        const newComment = await Comment.create(newCommentOption)
        foundCampground.comments.push(newComment)
        await foundCampground.save()
        req.flash("success", `Sucessfully added a comment`);
        res.redirect(`/campgrounds/camps/${id}`);
    }

    catch (error) {
        req.flash("error", `Something went wrong upon adding a comment. ${error.message}`);
        return res.redirect(`/campgrounds/camps/${id}/comment`)
    }
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_addComment;