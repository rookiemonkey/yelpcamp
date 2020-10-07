// ===========================
// ROUTE DEPENDENCIES
// ===========================
const passport = require("passport");
const cloudinary = require('cloudinary');
const setCloudinary = require("../../utilities/setCloudinary");
const toUpload = require("../../utilities/toUpload");
const toFormatUsername = require('../../utilities/toFormatUsername')
const areValidInputs = require('../../utilities/areValidInputs')
const User = require("../../schemas/userSchema");

cloudinary.config(setCloudinary());

// ===========================
// SIGNUP HANDLER:
// ===========================
const handler_signup = async (req, res, next) => {

    try {
        let avatar = await toUpload(cloudinary, req);
        if (!avatar) { avatar = 'https://res.cloudinary.com/promises/image/upload/v1596613153/global_default_image.png' }

        const validInputs = ['firstName', 'lastName', 'username', 'email', 'password', 'confirmPassword']
        const areValid = areValidInputs(validInputs, req.body)
        if (!areValid) { throw new Error("Invalid fields provided") }

        const { firstName, lastName, username, email, password, confirmPassword } = req.body;
        req.body.username = req.sanitize(username)
        req.body.firstName = req.sanitize(firstName)
        req.body.lastName = req.sanitize(lastName)
        req.body.username = toFormatUsername(username)

        const isValidPassword = password.length > 8
        if (!isValidPassword) { throw new Error('Please provide a valid password') }

        const isConfirmedPassword = password !== confirmPassword
        if (isConfirmedPassword) { throw new Error(`Password doesn't match`) }

        const user = new User({ firstName, lastName, avatar, username, email })
        await User.register(user, password)

        passport.authenticate('local', (error, user, info) => {
            if (error) { throw new Error(error) }
            req.flash("success", `Successfully created an account for ${req.body.username}. Please login.`)
            res.redirect("/campgrounds/camps")
        })(req, res, next)
    }

    catch (error) {
        req.flash("error", `${error.message}`)
        res.redirect("/campgrounds/users/signup");
    }
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_signup;