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
        const { _id, username, avatar } = req.user
        const { comment } = req.body
        const options = {
            comment: req.sanitize(comment),
            author: { _id, name: username, avatar }
        }
        const foundCampground = await Campground.findById(id)
        const newComment = await Comment.create(options)
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