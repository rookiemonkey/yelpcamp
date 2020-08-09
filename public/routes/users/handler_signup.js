// ===========================
// ROUTE DEPENDENCIES
// ===========================
const passport = require("passport");
const isStillApplicable = require("../../middleware/isStillApplicable");
const User = require("../../schemas/userSchema");

// middleware: isStillApplicable

// ===========================
// SIGNUP HANDLER:
// ===========================
const handler_signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email })
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