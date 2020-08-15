// ===========================
// ROUTE DEPENDENCIES
// ===========================
const User = require("../../schemas/userSchema");

// ===========================
// NEW PASSWORD ROUTE:
// ===========================
const form_resetPassword = async (req, res) => {
    try {
        const foundUser = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!foundUser) { throw new Error() }
        res.render('resetPassword', { token: req.params.token, user: req.user });
    }

    catch (error) {
        req.flash('error', 'Password reset token is invalid or expired');
        return res.redirect('/campgrounds/users/forgot_password');
    }
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = form_resetPassword;