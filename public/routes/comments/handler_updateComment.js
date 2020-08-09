// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../middleware/isAdmin");
const Comment = require("../../schemas/commentSchema");

// =========================================
// UPDATE COMMENT ROUTE: update handler
// =========================================
const handler_updateComment = (req, res) => {
    Comment.findById(req.params.comid, (err, foundComment) => {
        if (req.session.passport !== undefined && req.user.id == foundComment.author.id || isAdmin(req)) {
            let sanitizedComment = req.sanitize(req.body.comment);
            Comment.findByIdAndUpdate(req.params.comid, {
                comment: sanitizedComment
            }, (err) => {
                res.redirect(`/campgrounds/camps/${req.params.id}`);
            });
        } else {
            req.flash("error", "Something is not right. You need to be logged to edit a comment");
            return res.redirect(`/campgrounds/users/login`)
        }
    })
};

// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = handler_updateComment;