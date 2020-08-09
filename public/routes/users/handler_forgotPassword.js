// ===========================
// ROUTE DEPENDENCIES
// ===========================
const async = require('async');
const crypto = require('crypto');
const User = require("../../schemas/userSchema");
const toEmail = require("../../middleware/toEmail");
const setToken = require("../../middleware/setToken");

// ===========================
// PASSWORD RESET HANDLER:
// ===========================
const handler_forgotPassword = (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                let token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({ email: req.body.email }, async (err, foundUser) => {
                if (!foundUser) {
                    req.flash('error', 'No Account with that email address exists')
                    return res.redirect('/campgrounds/users/forgot_password');
                }
                await setToken(foundUser, token);
                done(err, token, foundUser);
            });
        },
        async function (token, foundUser, done) {
            await toEmail(
                foundUser.email,
                `Yelpcamp Password Reset`,
                `You received this email becuase your requested for a password reset for your Yelpcamp account. Please click the link below or paste it on your browser to proceed in resetting your password

                http://${req.headers.host}/campgrounds/forgot-password/reset/${token}

                If you did not request this, please disregard this email and we will not change your password, Also, report it to us immediately so we can take further action regarding the security of your account.`
            )
            req.flash('success', `An email has been sent to ${foundUser.email} with further instructions`);
            done();
        }
    ], () => {
        return res.redirect('/campgrounds/users/forgot_password');
    });
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_forgotPassword;