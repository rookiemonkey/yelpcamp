// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const passport = require("passport");
const setCookie = require("../middleware/setCookie");
const toCheckAdmin = require("../middleware/toCheckAdmin");
const isStillApplicable = require("../middleware/isStillApplicable");

// ===========================
// LOGIN ROUTE:
// ===========================
router.get("/campgrounds/login", isStillApplicable, (req, res) => {
    res.render("login", { user: req.user });
});


// LOGIN ROUTE: handler
router.post("/campgrounds/login", passport.authenticate("local", {
    failureRedirect: "/campgrounds/login",
    failureFlash: 'Invalid username or password'
}), async (req, res) => {

    const output = await toCheckAdmin(res.req.user.adminCode, res.req.body.admin);
    if (output && res.req.user.adminCode !== '') {
        const c = await setCookie(res.req.user._id);
        req.flash('success', `Succesfully logged in as ${res.req.user.username} with admin priviledges`);
        res.cookie('role', c.cookie, { maxAge: c.maxAge })
        return res.redirect('/campgrounds');
    } else {
        req.flash('success', `Succesfully logged in as ${res.req.user.username}`);
        res.clearCookie('role', { path: '/' })
        return res.redirect('/campgrounds');
    }

});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;