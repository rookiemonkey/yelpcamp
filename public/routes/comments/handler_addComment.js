// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isLoggedIn = require("../../middleware/isLoggedin");
const Comment = require("../../schemas/commentSchema");
const Campground = require("../../schemas/campgroundSchema");

// MIDDLEWARE: isloggedin

// ===========================
// SHOW ROUTE: handler for new comments
// ===========================
const handler_addComment = (req, res) => {
    // looks for the post being comemnted by the user
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.error(err);
        } else {

            // creates the comment and associates the one who commented
            Comment.create({
                comment: req.sanitize(req.body.comment),
                author: {
                    id: req.user.id,
                    name: req.user.username
                }
            },
                (err, newComment) => {

                    // adds the comment to the comment's array since its based on that schema
                    foundCampground.comments.push(newComment);

                    // once save the campground will be saved again in the database to update
                    foundCampground.save();

                    // redirects  to the same pag with the updated version of the page.
                    res.redirect(`/campgrounds/camps/${req.params.id}`);
                });
        };
    });
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_addComment;