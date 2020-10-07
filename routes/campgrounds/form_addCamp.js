// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isAdmin = require("../../utilities/isAdmin");

// ===========================
// ADD CAMP ROUTE
// ===========================
const form_addCamp = (req, res) => {
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
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = form_addCamp;