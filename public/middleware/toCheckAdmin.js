const bcrypt = require("bcrypt");
const toError = require("./toError");
const User = require('../schemas/userSchema');

const toCheckAdmin = async (
    adminCode = toError('adminCode'),
    admin = toError('admin'),
    _id = toError('user id')
) => {
    const foundUser = await User.findById(_id)
    if (!foundUser.isAdmin) { return false }
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(adminCode, salt);
    return await bcrypt.compareSync(admin, hash);
}

module.exports = toCheckAdmin;