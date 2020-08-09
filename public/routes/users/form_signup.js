// ===========================
// SIGNUP ROUTE:
// ===========================
const form_signup = async (req, res) => {
    try {
        if (req.session.passport !== undefined) { throw new Error('You are already logged in') }
        res.render("signup", { user: req.user });
    }

    catch (error) {
        req.flash("info", `${error.message}`)
        res.redirect("/campgrounds/camps");
    }
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = form_signup;