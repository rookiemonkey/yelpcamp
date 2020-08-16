// ===========================
// ROUTE DEPENDENCIES
// ===========================
const User = require("../../schemas/userSchema");
const isAdmin = require("../../middleware/isAdmin");

// ===========================
// PASSWORD RESET FORM ROUTE:
// ===========================
const user_profile = async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id)
        if (!foundUser) { throw new Error('User not found') }

        if (isAdmin(req)) {
            res.render("userProfile", {
                user: req.user,
                role: "ADMIN",
                foundUser
            });
        } else {
            res.render("userProfile", {
                user: req.user,
                role: null,
                foundUser
            });
        }
    }

    catch (error) {
        req.flash('error', `Something went wrong. ${error.message}`)
        res.redirect('/campgrounds/camps')
    }
}

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = user_profile