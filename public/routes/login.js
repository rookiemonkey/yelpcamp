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

    bcrypt.hash(res.req.user.adminCode, 10, async (err, hash) => {
            try {
                const output = await bcrypt.compare(res.req.body.admin, hash)
                if(output) {
                    const d = new Date();
                    const dt = d.setTime(d.getTime() + (30*24*60*60*1000));
                    const a = bcrypt.hashSync(toString(res.req.user._id), 10);
                    res.cookie('role', a, { maxAge: dt })
                    res.redirect('/')
                } else {
                    res.redirect('/')
                }
            }

            catch(err) {
                console.error("ERROR FROM LOGIN POST ROUTE: ", err)
                res.redirect('/campgrounds/login')
            }
    });
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;