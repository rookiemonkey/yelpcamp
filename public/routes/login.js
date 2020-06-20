// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const passport = require("passport");

// ===========================
// LOGIN ROUTE:
// ===========================
router.get("/campgrounds/login", (req, res) => {
    if(req.session.passport !== undefined) {
        // redirect to home if user access the URL when logged in
        res.redirect('/');
    }
    res.render("login", {user: req.user});
});


// LOGIN ROUTE: handler
router.post("/campgrounds/login", passport.authenticate("local", {
    successRedirect: "/",
    successFlash: true,
    failureRedirect: "/campgrounds/login",
    failureFlash: true
}), (req, res) => {});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;