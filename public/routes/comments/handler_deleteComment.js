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

        console.log('req.session.passport === undefined', req.session.passport === undefined)
        console.log('req.user.id != foundComment.author.id', req.user.id != foundComment.author.id)
        console.log('!isAdmin(req)', !isAdmin(req))
        if (req.session.passport === undefined &&
            req.user.id != foundComment.author.id ||
            isAdmin(req)) {
            throw new Error('Please log in first')
        }

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