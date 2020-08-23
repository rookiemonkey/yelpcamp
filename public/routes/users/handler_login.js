// ===========================
// ROUTE DEPENDENCIES
// ===========================
const passport = require("passport");
const setCookie = require("../../middleware/setCookie");
const toCheckAdmin = require("../../middleware/toCheckAdmin");

// ===========================
// LOGIN HANDLER:
// ===========================
const handler_login = async (req, res) => {

    try {
        const { adminCode, username, _id } = req.user
        const { admin } = req.body
        const output = await toCheckAdmin(adminCode, admin, _id);

        if (output && adminCode !== '') {
            const cookie = await setCookie(_id);
            req.flash('success', `Succesfully logged in as ${username} with admin priviledges`);
            res.cookie('role', cookie.cookie, { maxAge: cookie.maxAge })
            return res.redirect('/campgrounds/camps');
        } else {
            req.flash('success', `Succesfully logged in as ${username}`);
            res.clearCookie('role', { path: '/' })
            return res.redirect('/campgrounds/camps');
        }
    }

    catch (error) {
        req.flash("error", `${error.message}`)
        res.redirect('/campgrounds/camps')
    }
};

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = handler_login;