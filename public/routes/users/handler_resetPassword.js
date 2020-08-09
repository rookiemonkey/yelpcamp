// ===========================
// ROUTE DEPENDENCIES
// ===========================
const async = require('async');
const toUpdatePassword = require("../../middleware/toUpdatePassword");
const toEmail = require("../../middleware/toEmail");
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
                if (req.body.newPassword === req.body.confirmPassword) {
                    toUpdatePassword(foundUser, req.body.newPassword);
                    req.login(foundUser, (err) => { done(err, foundUser); });


                } else {
                    req.flash('error', 'Passwords do not match');
                    return res.redirect('back');
                }
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
            req.flash('success', 'Success! Your password has been changed');
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