// ===========================
// ROUTE DEPENDENCIES
// ===========================
const async = require('async');
const toUpdatePassword = require("../../utilities/toUpdatePassword");
const toEmail = require("../../utilities/toEmail");
const User = require("../../schemas/userSchema");

// ===========================
// NEW PASSWORD HANDLER:
// ===========================
const handler_resetPassword = (req, res) => {
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token }, (err, foundUser) => {
                if (!foundUser) {
                    req.flash('error', 'Password reset token is invalid or expired');
                    return res.redirect('back');
                }

                if (req.body.newPassword !== req.body.confirmPassword) {
                    req.flash('error', 'Passwords do not match');
                    return res.redirect('back');
                }

                toUpdatePassword(foundUser, req.body.newPassword);
                done(err, foundUser)
            })
        },
        async function (foundUser, done) {
            await toEmail(
                foundUser.email,
                `Yelpcamp Password Reset Success`,
                `We successfully reset your Yelpcamp Account password with the following details

                         USERNAME: ${foundUser.username}
                         EMAIL: ${foundUser.email}

                 Happy Camping!`
            );
            req.flash('success', 'Success! Your password has been changed. Please login using your new password');
            done();
        }
    ], () => {
        res.redirect('/campgrounds/camps');
    })
}


// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_resetPassword;