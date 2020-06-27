const isAdmin = (req, next) => {
    const c = req.headers.cookie;
    if (c !== undefined) {
        const i = c.indexOf('role=');
        if(i == -1) {
            return false
        } else {
            return true
        }
    }
}

module.exports = isAdmin;