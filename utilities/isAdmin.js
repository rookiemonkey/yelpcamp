const isAdmin = (req, next) => {
    const cookie = req.headers.cookie;
    if (!cookie) { return false }

    const index = cookie.indexOf('role=');
    if (index == -1) { return false }
    else { return true }
}

module.exports = isAdmin;