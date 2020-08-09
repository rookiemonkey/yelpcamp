// ===========================
// ROUTE DEPENDENCIES
// ===========================
const isStillApplicable = require("../../middleware/isStillApplicable");

// MIDDLEWARE: isStillApplicable

// ===========================
// LOGIN ROUTE:
// ===========================
const form_login = (req, res) => {
    res.render("login", { user: req.user });
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = form_login;