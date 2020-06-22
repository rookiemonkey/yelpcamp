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
        // msg: you are already logged in
        res.redirect("/");
    }
    res.render("signup", {user: req.user});
});


// SIGNUP ROUTE: handler
router.post("/campgrounds/signup", isStillApplicable, (req, res) => {
    User.register(new User ({username: req.body.username}), req.body.password, (err, newUser) => {
        if(err) {
            req.flash("error", `${err.message}. Please use a different username.`);
            res.redirect("/campgrounds/signup");
        } else {
            passport.authenticate("local")(req, res, function(){res.redirect("/")} )
        }
    });
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;