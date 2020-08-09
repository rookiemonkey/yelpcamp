// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../middleware/isAdmin");
const Comment = require("../../schemas/commentSchema");
const Campground = require("../../schemas/campgroundSchema");

// =========================================
// DELETE COMMENT ROUTE: delete handler
// =========================================
const handler_deleteComment = (req, res) => {
    Comment.findById(req.params.comid, (err, foundComment) => {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (req.session.passport !== undefined && req.user.id == foundComment.author.id || isAdmin(req)) {
                // removed comment reference from the campground first
                foundCampground.comments.remove({ _id: req.params.comid })
                // then removed the comment from the comments collections
                Comment.findByIdAndRemove(req.params.comid, (err => {
                    res.redirect(`/campgrounds/camps/${req.params.id}`)
                }));
            } else {
                // display a message that they cannot do that
                req.flash("error", "Something is not right. You need to be logged in and the author of the comment to delete it");
                return res.redirect(`/campgrounds/users/login`)
            }
        });
    });
};

// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = handler_deleteComment;