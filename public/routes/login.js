// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const passport = require("passport");
const isStillApplicable = require("../middleware/isStillApplicable");

// ===========================
// LOGIN ROUTE:
// ===========================
router.get("/campgrounds/login", isStillApplicable, (req, res) => {
    if(req.session.passport !== undefined) {
        // redirect to home if user access the URL when logged in
        res.redirect('/');
    }
    res.render("login", {user: req.user});
});


// LOGIN ROUTE: handler
router.post("/campgrounds/login", passport.authenticate("local", {
    // successRedirect: "/",
    successFlash: true,
    // failureRedirect: "/campgrounds/login",
    failureFlash: true
}), (req, res) => {


    // compare these two if matched login as ADMIN if "" or not matched regular login
    console.log(res.req.body.admin || "empty string") // from the form
    console.log(res.req.user.adminCode) // all info of the user from db

    // use bcrypt sign a token for res.req.user._id
    // use secret key adminCode
    // store the token it on localstorage
    // this is to check if the user is an admin allthrough out the website
    console.log(res.req.user._id)
    console.log(res.req.user.adminCode)

    res.redirect('/')
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;