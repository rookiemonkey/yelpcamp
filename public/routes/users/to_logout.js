// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();

// MIDDLEWARE: isLoggedIn

// ===========================
// LOGOUT ROUTE:
// ===========================
const to_logout = (req, res) => {

    res.status(200)
    res.clearCookie('connect.sid', { path: '/' });
    res.clearCookie('role', { path: '/' });
    req.session.destroy(function (err) {
        return res.redirect('/campgrounds/camps');
    });

};


// middleware - check if signed in
function isLoggedIn(req, res, next) {

    // req.session.passport contains an object when user is signed
    // if not, req.session.passport is undefined
    let rt = req.route;
    let rs = req.session;

    if (rs.passport !== undefined) {

        if (rt.path === "/campgrounds/users/signup" && rt.hasOwnProperty("methods")) {

            res.redirect("/campgrounds/camps");

        } else {

            return next();

        }

    } else if (rs.passport === undefined && rt.methods.post === true) {

        return next();

    } else {

        res.redirect("/campgrounds/users/login");

    }
};


// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = to_logout;