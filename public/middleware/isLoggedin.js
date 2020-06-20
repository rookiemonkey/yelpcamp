const isLoggedIn = (req, res, next) => {
    if(req.session.passport !== undefined){

        return next();

    } else {

        req.flash("error", "Please log in first");
        res.redirect("/campgrounds/login");

    };
}

module.exports =  isLoggedIn;