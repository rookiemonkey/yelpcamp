// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();

// ===========================
// LOGOUT ROUTE:
// ===========================
router.get("/campgrounds/logout", isLoggedIn, (req, res) => {

    res.status(200)
    res.clearCookie('connect.sid', { path: '/' });
    res.clearCookie('role', { path: '/' });
    req.session.destroy(function (err) {
        return res.redirect('/campgrounds');
    });

});


// middleware - check if signed in
function isLoggedIn(req, res, next) {

    // req.session.passport contains an object when user is signed
    // if not, req.session.passport is undefined
    let rt = req.route;
    let rs = req.session;

    if(rs.passport !== undefined){

        if(rt.path === "/campgrounds/signup" && rt.hasOwnProperty("methods")) {

            res.redirect("/");

        } else {

            return next();

        }

    } else if (rs.passport === undefined && rt.methods.post === true) {

            return next();

    } else {

        res.redirect("/campgrounds/login");

    }
};


// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;