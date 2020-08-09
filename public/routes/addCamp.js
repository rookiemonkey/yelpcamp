// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const isLoggedIn = require("../middleware/isLoggedin");

// ===========================
// ADD CAMP ROUTE
// ===========================
router.get("/campgrounds/new", isLoggedIn, (req, res) => {
  if (isAdmin(req)) {
    res.render("addcampground", {
      user: req.user,
      role: "ADMIN"
    });
  } else {
    res.render("addcampground", {
      user: req.user,
      role: null
    });
  }
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;