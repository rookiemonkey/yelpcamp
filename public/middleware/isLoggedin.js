const isLoggedIn = (req, res, next) => {
    if(req.session.passport !== undefined){

        return next();

    } else {

        req.flash("error", "Something is not right. You need to be logged in to add a comment");
        res.redirect("/campgrounds/login");

    };
}

module.exports =  isLoggedIn;