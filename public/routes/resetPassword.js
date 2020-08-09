// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const User = require("../schemas/userSchema");

// ===========================
// NEW PASSWORD ROUTE:
// ===========================
router.get('/campgrounds/forgot-password/reset/:token', (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, foundUser) => {
        if (!foundUser) {
            req.flash('error', 'Password reset token is invalid or expired');
            return res.redirect('/campgrounds/forgot-password');
        }
        res.render('resetPassword', { token: req.params.token, user: req.user });
    });
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;