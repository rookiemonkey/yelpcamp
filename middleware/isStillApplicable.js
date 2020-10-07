const isStillApplicable = (req, res, next) => {
    if (req.session.passport === undefined) {

        return next();

    } else {

        req.flash("error", "You are already logged in and has an account");
        res.redirect("/campgrounds/camps");

    };
}

module.exports = isStillApplicable;