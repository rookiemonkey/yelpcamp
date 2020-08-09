// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const passport = require("passport");
const setCookie = require("../middleware/setCookie");
const toCheckAdmin = require("../middleware/toCheckAdmin");

// ===========================
// LOGIN HANDLER:
// ===========================
router.post("/campgrounds/login", passport.authenticate("local", {
    failureRedirect: "/campgrounds/login",
    failureFlash: 'Invalid username or password'
}), async (req, res) => {

    try {
        const { adminCode, username, _id } = req.user
        const { admin } = req.body
        const output = await toCheckAdmin(adminCode, admin);
        const cookie = await setCookie(_id);

        if (output && adminCode !== '') {
            req.flash('success', `Succesfully logged in as ${username} with admin priviledges`);
            res.cookie('role', cookie.cookie, { maxAge: cookie.maxAge })
            return res.redirect('/campgrounds');
        } else {
            req.flash('success', `Succesfully logged in as ${username}`);
            res.clearCookie('role', { path: '/' })
            return res.redirect('/campgrounds');
        }
    }

    catch (error) {
        req.flash("error", `${error.message}`)
        res.redirect('/campgrounds')
    }
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;