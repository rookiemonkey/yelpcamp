// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const isStillApplicable = require("../middleware/isStillApplicable");

// ===========================
// PASSWORD RESET FORM ROUTE:
// ===========================
router.get('/campgrounds/forgot-password', isStillApplicable, (req, res) => {
    res.render('forgotPassword', { user: req.user });
})

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;