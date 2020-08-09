// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const Comment = require("../schemas/commentSchema");

router.put("/campgrounds/:id/comment/:comid/update", (req, res) => {
    Comment.findById(req.params.comid, (err, foundComment) => {
        if (req.session.passport !== undefined && req.user.id == foundComment.author.id || isAdmin(req)) {
            let sanitizedComment = req.sanitize(req.body.comment);
            Comment.findByIdAndUpdate(req.params.comid, {
                comment: sanitizedComment
            }, (err) => {
                res.redirect(`/campgrounds/${req.params.id}`);
            });
        } else {
            req.flash("error", "Something is not right. You need to be logged to edit a comment");
            return res.redirect(`/campgrounds/login`)
        }
    })
});


// =========================================
// EXPORT ALL ROUTES
// =========================================
module.exports = router;