const isAdmin = (req, next) => {
    if(req.header.cookie) {
        const c = req.headers.cookie;
        const i = c.indexOf('role=');
        if(i == -1) {
            return false
        } else {
            return true
        }
    } return false
}

module.exports = isAdmin;