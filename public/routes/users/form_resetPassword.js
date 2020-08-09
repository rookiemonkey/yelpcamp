// ===========================
// ROUTE DEPENDENCIES
// ===========================
const User = require("../../schemas/userSchema");

// ===========================
// NEW PASSWORD ROUTE:
// ===========================
const form_resetPassword = (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, foundUser) => {
        if (!foundUser) {
            req.flash('error', 'Password reset token is invalid or expired');
            return res.redirect('/campgrounds/users/forgot_password');
        }
        res.render('resetPassword', { token: req.params.token, user: req.user });
    });
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = form_resetPassword;