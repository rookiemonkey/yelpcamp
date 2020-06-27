// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const passport = require("passport");
const isStillApplicable = require("../middleware/isStillApplicable");
const User = require("../schemas/userSchema");

// ===========================
// SIGNUP ROUTE:
// ===========================
router.get("/campgrounds/signup", isStillApplicable, (req, res) => {
    if(req.session.passport !== undefined) {
        req.flash("info", "You are already logged in")
        res.redirect("/");
    }
    res.render("signup", {user: req.user});
});


// SIGNUP ROUTE: handler
router.post("/campgrounds/signup", isStillApplicable, (req, res) => {
    const { username, email, password } = req.body;
    User.register(new User ({ username: username, email: email }), password, (err, newUser) => {
        if(err) {
            if (err.name === 'UserExistsError') {
                req.flash("error", `It looks like we are having some challenges creating the account. ${err.message}. Please use a different one.`);
                return res.redirect("/campgrounds/signup");
            }
            else if (err.name === 'MongoError') {
                req.flash("error", `It looks like we are having some challenges creating the account. A user is already using the email address that you typed in. Please use a different one.`);
                return res.redirect("/campgrounds/signup");
            }
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", `Successfully created an account for ${req.body.username}`)
                return res.redirect("/campgrounds");
            })
        }
    });
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;