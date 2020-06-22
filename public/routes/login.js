// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt")
const isStillApplicable = require("../middleware/isStillApplicable");

// ===========================
// LOGIN ROUTE:
// ===========================
router.get("/campgrounds/login", isStillApplicable, (req, res) => {
    if(req.session.passport !== undefined) {
        res.redirect('/');
    }
    res.render("login", {user: req.user});
});


// LOGIN ROUTE: handler
router.post("/campgrounds/login", passport.authenticate("local"), async (req, res) => {

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(res.req.user.adminCode, salt);
    const output = await bcrypt.compareSync(res.req.body.admin, hash);

   if(output && res.req.user.adminCode !== '') {
        const d = new Date();
        const dt = d.setTime(d.getTime() + (30*24*60*60*1000));
        const a = bcrypt.hashSync(toString(res.req.user._id), 10);
        res.cookie('role', a, { maxAge: dt })
        res.redirect('/')
    } else {
        res.clearCookie('role', { path: '/' })
        res.redirect('/')
    }

});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;