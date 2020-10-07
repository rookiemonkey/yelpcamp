// ===========================
// PASSWORD RESET FORM ROUTE:
// ===========================
const form_forgotPassword = (req, res) => {
    res.render('forgotPassword', { user: req.user });
}

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = form_forgotPassword;