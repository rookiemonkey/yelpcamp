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

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = to_logout;