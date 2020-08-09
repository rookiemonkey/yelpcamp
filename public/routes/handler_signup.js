// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const passport = require("passport");
const isStillApplicable = require("../middleware/isStillApplicable");
const User = require("../schemas/userSchema");

// ===========================
// SIGNUP HANDLER:
// ===========================
router.post("/campgrounds/signup", isStillApplicable, async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email })
        await User.register(user, password)
        await passport.authenticate("local")
            (req, res, () => {
                req.flash("success", `Successfully created an account for ${req.body.username}`)
                return res.redirect("/campgrounds");
            })
    }

    catch (error) {
        req.flash("error", `${error.message}`)
        res.redirect("/campgrounds/signup");
    }
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;