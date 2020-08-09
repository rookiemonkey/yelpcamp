// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const isStillApplicable = require("../middleware/isStillApplicable");

// ===========================
// LOGIN ROUTE:
// ===========================
router.get("/campgrounds/login", isStillApplicable, (req, res) => {
    res.render("login", { user: req.user });
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;