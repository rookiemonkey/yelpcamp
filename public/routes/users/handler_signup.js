// ===========================
// ROUTE DEPENDENCIES
// ===========================
const passport = require("passport");
const cloudinary = require('cloudinary');
const setCloudinary = require("../../middleware/setCloudinary");
const toUpload = require("../../middleware/toUpload");
const isPasswordStrong = require('../../middleware/isPasswordStrong');
const User = require("../../schemas/userSchema");

cloudinary.config(setCloudinary());

// ===========================
// SIGNUP HANDLER:
// ===========================
const handler_signup = async (req, res) => {

    try {
        const avatar = await toUpload(cloudinary, req);
        const { firstName, lastName, username, email, password } = req.body;
        await isPasswordStrong(password)
        const user = new User({ firstName, lastName, avatar, username, email })
        await User.register(user, password)
        await passport.authenticate("local")
            (req, res, () => {
                req.flash("success", `Successfully created an account for ${req.body.username}`)
                return res.redirect("/campgrounds/camps");
            })
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