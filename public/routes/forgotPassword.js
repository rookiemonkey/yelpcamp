// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require("../schemas/userSchema");
const isStillApplicable = require("../middleware/isStillApplicable");

// ===========================
// PASSWORD RESET FORM ROUTE:
// ===========================
router.get('/campgrounds/forgot-password', isStillApplicable, (req, res) => {
    res.render('forgotPassword', { user: req.user });
})

router.post('/campgrounds/forgot-password', (req, res, next) => {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, (err, buf) => {
                let token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, (err, foundUser) => {
                if (!foundUser) {
                    req.flash('error', 'No Account with that email address exists')
                    return res.redirect('/campgrounds/forgot-password');
                }
                foundUser.resetPasswordToken = token;
                foundUser.resetPasswordExpires = Date.now() + 3600000 // 1hr
                foundUser.save((err) => {
                    done(err, token, foundUser);
                });
            });
        },
        function(token, foundUser, done) {
            const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'kevinroirigorbasina@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            const mailOptions = {
                subject: `Yelpcamp Password Reset`,
                to: foundUser.email,
                from: 'YelpCamp-Team-NOREPLY@gmail.com',
                text: `You received this email becuase your requested for a password reset for your Yelpcamp account. Please click the link below or paste it on your browser to proceed in resetting your password

                    http://${req.headers.host}/campgrounds/forgot-password/reset/${token}

                    If you did not request this, please disregard this email and we will not change your password, Also, report it to us immediately so we can take further action regarding the security of your account.`
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                req.flash('success', `An email has been sent to ${foundUser.email} with further instructions`);
                done(err, 'done');
            })
        }
    ], (err) => {
        if (err) return next(err);
        return res.redirect('/campgrounds/forgot-password');
    });
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;