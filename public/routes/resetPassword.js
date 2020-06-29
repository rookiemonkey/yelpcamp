// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const async = require('async');
const nodemailer = require('nodemailer');
const toUpdatePassword = require("../middleware/toUpdatePassword");
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

router.post('/campgrounds/forgot-password/reset/:token', (req, res) => {
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
        function (foundUser, done) {
            const smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: 'kevinroirigorbasina@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            const mailOptions = {
                subject: `Yelpcamp Password Reset Success`,
                to: foundUser.email,
                from: 'YelpCamp-Team-NOREPLY@gmail.com',
                text: `We successfully reset your Yelpcamp Account password with the following details

                        USERNAME: ${foundUser.username}
                        EMAIL: ${foundUser.email}

                Happy Camping!`
            }
            smtpTransport.sendMail(mailOptions, (err) => {
                req.flash('success', 'Success! Your password has been changed');
                done(err);
            })
        }
    ], (err) => {
        res.redirect('/campgrounds');
    })
})


// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;