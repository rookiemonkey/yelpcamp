// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const isStillApplicable = require("../middleware/isStillApplicable");

// ===========================
// SIGNUP ROUTE:
// ===========================
router.get("/campgrounds/signup", isStillApplicable, async (req, res) => {
    try {
        if (req.session.passport !== undefined) { throw new Error('You are already logged in') }
        res.render("signup", { user: req.user });
    }

    catch (error) {
        req.flash("info", `${error.message}`)
        res.redirect("/campgrounds");
    }
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;